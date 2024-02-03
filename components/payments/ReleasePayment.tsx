import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function ReleasePayment({
  assignmentId,
  student,
  assignmentData,
  tutorDetails,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const router = useRouter()

  const handleReleasePayment = async () => {
    const taskRef = doc(db, 'assignments', assignmentId)

    await updateDoc(taskRef, {
      paymentReleased: true,
      status: 'Completed',
    })
    await addDoc(collection(db, 'notifications'), {
      receiverId: assignmentData.tutor.userId,
      senderId: student.userId,
      type: 'ReleasePayment',
      content: 'has released payment on',
      assignmentTitle: assignmentData.title,
      assignmentId,
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: 'airtaska@gmail.com',
      message: {
        subject: 'Release Payment',
        html: `Payment needs to be released for ${assignmentData.title}. Account Holder Name: ${tutorDetails?.bankAccount.accountHolderName}, Account Number: ${tutorDetails?.bankAccount.accountNumber}, BSB:${tutorDetails?.bankAccount.BSB}`,
      },
    })
    await addDoc(collection(db, 'mail'), {
      to: tutorDetails?.email,
      message: {
        subject: 'Payment Released',
        html: `Payment has been released by the student for ${assignmentData?.title}, it will take 2-5 business days to reflect in your nominated bank account. Account Holder Name: ${tutorDetails?.bankAccount.accountHolderName}, Account Number: ${tutorDetails?.bankAccount.accountNumber}, BSB:${tutorDetails?.bankAccount.BSB} `,
      },
    })

    toast.success('Payment released')
    setIsFormOpen(false)
    router.reload()
  }
  return (
    <div>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-2 w-full rounded-full bg-green-900 py-2 font-semibold text-white"
      >
        Release Payment
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="min-h-[200px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`flex
               flex-row justify-between`}
            >
              <div className="flex-1 text-center text-base font-medium text-gray-800">
                Release Payment
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mt-5 text-base font-medium text-gray-700">
              <p className="pt-1 pb-2 text-lg">
                You are releasing payment for{' '}
                <span className="text-blue-800">{assignmentData.title}</span>.{' '}
                <span className="text-green-950">
                  {tutorDetails.firstName} {tutorDetails.lastName}
                </span>{' '}
                will be notified you have released payment.
              </p>
            </div>
            <div className="mt-3 flex flex-row items-center justify-between text-sm font-medium text-gray-700">
              <span>Bid</span>
              <span>${assignmentData.tutor.price}</span>
            </div>
            <div className="flex flex-row items-center justify-between text-sm font-medium text-gray-700">
              <span>Service fee</span>
              <span>-${assignmentData.tutor.serviceFee}</span>
            </div>
            <div className="mb-10 flex flex-row items-center justify-between text-base font-medium text-green-950">
              <span>Earned Amount</span>
              <span>${assignmentData.tutor.finalPrice}</span>
            </div>
            <div className="w-full">
              <button
                onClick={handleReleasePayment}
                className="w-full rounded-full bg-blue-600 px-2 py-1.5 text-center font-medium text-white"
              >
                Release Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
