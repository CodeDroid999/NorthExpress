import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { useRouter } from 'next/router'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { UserAuth } from 'context/AuthContext'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import profile from 'public/profile.jpeg'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from 'components/payments/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function AcceptOffer({ offer, assignmentData, student }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [clientSecret, setClientSecret] = React.useState('')

  function calculateFinalPrice(price: string) {
    const bookingFeePercentage = 16
    const taskPrice = parseFloat(price)
    const bookingFee = (bookingFeePercentage / 100) * taskPrice
    const finalPrice = bookingFee + taskPrice
    return {
      bookingFee: bookingFee.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    }
  }

  const { bookingFee, finalPrice } = calculateFinalPrice(offer.amount)

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: finalPrice,
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [finalPrice])

  const appearance = {
    theme: 'stripe',
  }
  const options: any = {
    clientSecret,
    appearance,
  }

  const router = useRouter()
  const { user } = UserAuth()
  const assignmentId = router.query.id.toString()

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const assignTutor = async () => {
    const taskRef = doc(db, 'assignments', assignmentId)

    const newDoc: any = await updateDoc(taskRef, {
      status: 'Assigned',
      tutor: {
        userId: offer.userId,
        price: offer.amount,
        serviceFee: offer.serviceFee,
        finalPrice: offer.finalPrice,
        proposal: offer.proposal,
      },
      student: {
        userId: user.userId,
        price: offer.amount,
        bookingFee: bookingFee,
        finalPrice: finalPrice,
      },
    })

    await addDoc(collection(db, 'notifications'), {
      receiverId: offer.userId,
      senderId: user.userId,
      type: 'AcceptOffer',
      content: 'has accepted your offer on',
      assignmentTitle: assignmentData.title,
      assignmentId,
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: offer?.customer.email,
      message: {
        subject: 'Bid Accepted',
        html: `${user?.firstName} has accepted your offer on ${assignmentData?.title}. You can now start working on it!`,
      },
    })

    await addDoc(collection(db, 'payments'), {
      tutorId: offer.userId,
      studentId: user.userId,
      assignmentTitle: assignmentData.title,
      assignmentId,
      createdAt: serverTimestamp(),
      tutorAmount: {
        price: offer.amount,
        serviceFee: offer.serviceFee,
        finalPrice: offer.finalPrice,
      },
      student: {
        price: offer.amount,
        bookingFee: bookingFee,
        finalPrice: finalPrice,
      },
    })

    toast.success('You successfully assigned the Homework')
    closeForm()
    router.reload()
  }

  return (
    <div className="relative w-full">
      <button
        onClick={openForm}
        className="w-full  rounded-full bg-green-900 p-2 font-semibold text-white"
      >
        Accept
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`flex
              cursor-pointer flex-row justify-end`}
            >
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={closeForm}
              />
            </div>

            <div className="flex flex-col items-center gap-2 pt-8">
              <div className="flex w-full flex-row items-center">
                <Image
                  src={student?.profilePicture || profile}
                  height={50}
                  width={50}
                  alt="profile"
                  className=" h-[50px] w-[50px] rounded-full object-cover"
                />
                <div className="ml-3 flex flex-1 flex-col">
                  <span className="text-base font-semibold text-blue-950">
                    {student?.firstName} {student?.lastName}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {assignmentData.title}
                  </span>
                </div>
              </div>

              <div className="mt-3 w-full">
                <div className="flex flex-row items-center justify-between font-medium text-gray-600">
                  <span>Assignment     Price</span>
                  <span>${offer.amount}</span>
                </div>
                <div className="flex flex-row items-center justify-between font-medium text-gray-600">
                  <span>Booking fee</span>
                  <span>${bookingFee}</span>
                </div>
                <div className="flex flex-row items-center justify-between font-bold text-green-950">
                  <span>Total</span>
                  <span>${finalPrice}</span>
                </div>
              </div>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <PaymentForm assignTutor={assignTutor} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
