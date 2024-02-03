import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'
import { BiArrowBack, BiLock } from 'react-icons/bi'
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

export default function MakeOffer({
  proposal,
  offerId,
  student,
  assignmentTitle,
  studentId,
}) {
  const [step, setStep] = useState(1)
  const [newOffer, setNewOffer] = useState('')
  const [newProposal, setNewProposal] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [offerError, setOfferError] = useState('')
  const [proposalError, setProposalError] = useState('')

  const router = useRouter()
  const { user } = UserAuth()

  const assignmentId = router.query.id.toString()

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setNewOffer('')
    setNewProposal(proposal)
    setStep(1)
  }

  const goToStep2 = (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!newOffer) {
      setOfferError('* This field is required')
      hasError = true
    } else {
      const offerValue = Number(newOffer)
      if (isNaN(offerValue) || offerValue < 5 || offerValue > 9999) {
        setOfferError('The price must be between $5 and $9999')
        hasError = true
      } else {
        setOfferError('')
      }
    }

    if (hasError) {
      return
    }
    setStep(2)
  }
  const goToStep3 = (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!newProposal) {
      setProposalError('* This field is required')
      hasError = true
    } else if (newProposal.length < 25) {
      setProposalError('Must be at least 25 characters')
      hasError = true
    } else if (newProposal.length > 1500) {
      setProposalError('Must not exceed 1500 characters')
      hasError = true
    } else {
      setProposalError('')
    }

    if (hasError) {
      return
    }
    setStep(3)
  }

  const SubmitForm = async (event: any) => {
    event.preventDefault()
    const taskRef = doc(db, 'assignments', assignmentId)
    const offerRef = doc(collection(taskRef, 'offers'), offerId)
    await updateDoc(offerRef, {
      amount: newOffer,
      proposal: newProposal,
      serviceFee: serviceFee,
      finalPrice: finalPrice,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'notifications'), {
      receiverId: studentId,
      senderId: user.userId,
      type: 'UpdateOffer',
      content: 'has updated offer made on',
      assignmentTitle,
      assignmentId,
      read: false,
      createdAt: serverTimestamp(),
    })
    await addDoc(collection(db, 'mail'), {
      to: student?.email,
      message: {
        subject: 'Bid Updated',
        html: `${user?.userId} has updated offer made on ${assignmentTitle}`,
      },
    })
    toast.success('Your bid has been updated')

    closeForm()
  }

  const previousStep = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  function calculateFinalPrice(price: any) {
    const serviceFeePercentage = 16
    const serviceFee = (serviceFeePercentage / 100) * price
    const finalPrice = price - serviceFee
    return {
      serviceFee: serviceFee.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    }
  }

  const { serviceFee, finalPrice } = calculateFinalPrice(newOffer)
  const charactersRemaining = 1500 - newProposal.length
  return (
    <div className="relative">
      <button
        onClick={openForm}
        className="w-full cursor-pointer rounded-full bg-green-900 px-4 py-2 text-center font-semibold text-white"
      >
        Update Bid
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="min-h-[400px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`${step === 1 ? 'justify-end' : 'justify-between'
                } flex cursor-pointer flex-row`}
            >
              <BiArrowBack
                size={20}
                className={`${step === 1 ? 'hidden' : 'block'} cursor-pointer`}
                onClick={previousStep}
              />

              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={closeForm}
              />
            </div>

            {step === 1 && (
              <div className="flex flex-col items-center gap-2 pt-8">
                <div className="flex w-[150px] flex-col items-center justify-center px-2">
                  <label
                    htmlFor="offer"
                    className="text-lg font-medium text-green-950"
                  >
                    Your Bid
                  </label>
                  <div className="relative flex flex-row items-center">
                    <BsCurrencyDollar className="absolute left-0 mx-2  pt-0.5 text-3xl text-green-950" />
                    <input
                      type="text"
                      value={newOffer}
                      onChange={(e) => setNewOffer(e.target.value)}
                      className="h-20 w-full rounded-lg  bg-gray-300 py-2 pl-9  text-3xl font-semibold
                  text-green-950 outline-none"
                    />
                  </div>
                </div>
                {offerError && (
                  <span className="py-1 text-red-500">{offerError}</span>
                )}
                <div className="mt-3 w-full">
                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                    <span>Service fee</span>
                    <span>-${serviceFee}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                    <span>You will receive</span>
                    <span>${finalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={goToStep2}
                  className="mt-16 w-full rounded-full bg-green-900 py-2 font-semibold text-white"
                >
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col pt-8">
                <h1 className="font-medium text-green-950 ">
                  Why are you the best person for this assignment?
                </h1>
                <p className="mb-3 text-sm font-medium text-gray-800">
                  For your safety, do not share personal information e.g email,
                  phone or address
                </p>
                <textarea
                  placeholder="e.g. I will be great for this assignment. I have the necessary experience,skills and equipment required to get this done."
                  value={newProposal}
                  onChange={(e) => setNewProposal(e.target.value)}
                  className="h-40 w-full rounded-lg border bg-gray-50 p-2 text-sm font-medium
                  text-gray-800 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-xs font-medium text-gray-800">
                  {charactersRemaining} characters remaining
                </p>
                {proposalError && (
                  <span className="text-sm text-red-500">{proposalError}</span>
                )}
                <button
                  onClick={goToStep3}
                  className="mt-2 w-full rounded-full bg-green-900 py-2 font-semibold text-white"
                >
                  Next
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="flex h-full flex-col">
                <h1 className="mb-2 text-center font-semibold text-green-950">
                  Preview offer
                </h1>

                <div className="flex w-full items-center justify-center rounded-xl bg-gray-200 p-3">
                  <div className="flex flex-col items-center">
                    <h1 className="text-base font-medium text-green-950">
                      Your bid
                    </h1>
                    <p className="text-2xl font-semibold text-green-950">
                      ${newOffer}
                    </p>
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                    <span>Service fee</span>
                    <span>-${serviceFee}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between font-medium text-green-950">
                    <span>You will receive</span>
                    <span>${finalPrice}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="mt-1 text-sm font-medium text-green-950">
                    * QualityunitedWriters automatically includes a Service Fee to cover
                    insurance and transaction costs.
                  </p>
                  <div className="mt-4 max-w-[280px] rounded-xl border border-gray-400 px-3 py-2">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col items-center justify-center rounded-full bg-blue-100 p-3">
                        <BiLock className="text-blue-800" size={22} />
                      </div>
                      <div className="ml-3 flex-1">
                        <h1 className="text-sm font-medium text-green-950">
                          Get paid securely
                        </h1>
                        <p className="text-xs font-medium text-gray-700">
                          Assignmentfunds are held securely until the assignment is
                          completed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={SubmitForm}
                  className="mt-10 w-full rounded-full bg-green-900 py-2 font-semibold text-white"
                >
                  Submit new bid
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
