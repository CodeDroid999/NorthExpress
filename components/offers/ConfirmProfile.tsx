import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { MdAddCircle } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'

export default function ConfirmProfile({ closePopup, goToForms }) {
  const { user } = UserAuth()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [billingAddressError, setBillingAddressError] = useState('')
  const router = useRouter()
  const assignmentId = router.query.id.toString()

  const dateHandler = async (event: any) => {
    event.preventDefault()
    let hasError = false

    if (!date) {
      setDateError('* This field is required')
      hasError = true
    } else {
      setDateError('')
    }

    if (hasError) {
      return
    }
    const q = query(collection(db, 'users'), where('userId', '==', user.userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        dateOfBirth: date,
      })
    }

    toast.success('Date of Birth has been updated')
    setStep(1)
  }

  const phoneNumberHandler = async (event: any) => {
    event.preventDefault()
    let hasError = false

    if (!phoneNumber) {
      setPhoneNumberError('* This field is required')
      hasError = true
    } else if (phoneNumber.length >= 2 && phoneNumber.substr(0, 2) !== '04') {
      setPhoneNumberError('Invalid phone number. Enter Australian number')
      hasError = true
    } else {
      setPhoneNumberError('')
    }

    if (hasError) {
      return
    }
    const q = query(collection(db, 'users'), where('userId', '==', user.userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        phoneNumber: phoneNumber,
      })
    }

    toast.success('phone number has been updated')
    setStep(1)
  }

  const billingAddressHandler = async (event: any) => {
    event.preventDefault()
    let hasError = false

    if (!billingAddress) {
      setBillingAddressError('* This field is required')
      hasError = true
    } else {
      setBillingAddressError('')
    }

    if (hasError) {
      return
    }
    const q = query(collection(db, 'users'), where('userId', '==', user.userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        billingAddress: billingAddress,
      })
    }

    toast.success('Billing address has been updated')
    setStep(1)
  }
  return (
    <div>
      <div
        className={`${step === 1 ? 'justify-end' : 'justify-between'
          } flex cursor-pointer flex-row`}
      >
        <BiArrowBack
          size={20}
          className={`${step === 1 ? 'hidden' : 'block'} cursor-pointer`}
          onClick={() => setStep(1)}
        />

        <AiOutlineClose
          size={20}
          className="cursor-pointer"
          onClick={closePopup}
        />
      </div>
      {step === 1 && (
        <div className="mt-16 ">
          <div>
            <h1 className="text-2xl font-medium text-green-950">
              Before you make a bid
            </h1>
            <p className="text-sm font-medium text-gray-600">
              Help us keep QualityunitedWriters safe and fun, and fill in a few details
            </p>
          </div>
          <div className="my-4">
            <div className="flex flex-row items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                Profile picture
              </span>
              {user.profilePicture === '' ? (
                <span>
                  <MdAddCircle
                    className="cursor-pointer text-blue-600"
                    size={26}
                    onClick={() => router.push(`/profile/${user.userId}`)}
                  />
                </span>
              ) : (
                <span>
                  <BsFillCheckCircleFill className="text-blue-800" size={22} />
                </span>
              )}
            </div>
            <div className="my-4 flex flex-row items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                Date of birth
              </span>
              {user.dateOfBirth === '' ? (
                <span>
                  <MdAddCircle
                    className="cursor-pointer text-blue-600"
                    size={26}
                    onClick={() => setStep(2)}
                  />
                </span>
              ) : (
                <span>
                  <BsFillCheckCircleFill className="text-blue-800" size={22} />
                </span>
              )}
            </div>
            <div className="my-4 flex flex-row items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                Verify phone number
              </span>
              {user.phoneNumber === '' ? (
                <span>
                  <MdAddCircle
                    className="cursor-pointer text-blue-600"
                    size={26}
                    onClick={() => setStep(3)}
                  />
                </span>
              ) : (
                <span>
                  <BsFillCheckCircleFill className="text-blue-800" size={22} />
                </span>
              )}
            </div>
            <div className="my-4 flex flex-row items-center justify-between">
              <span className="text-base font-medium text-gray-800">
                Billing Address
              </span>
              {user.billingAddress === '' ? (
                <span>
                  <MdAddCircle
                    className="cursor-pointer text-blue-600"
                    size={26}
                    onClick={() => setStep(4)}
                  />
                </span>
              ) : (
                <span>
                  <BsFillCheckCircleFill className="text-blue-800" size={22} />
                </span>
              )}
            </div>
          </div>

          <div className="mt-20">
            {user.profilePicture !== '' &&
              user.dateOfBirth !== '' &&
              user.billingAddress !== '' &&
              user.phoneNumber !== '' ? (
              <button
                className="w-full rounded-full bg-green-900 p-2 font-medium text-white"
                onClick={goToForms}
              >
                Continue
              </button>
            ) : (
              <div className="w-full rounded-full bg-gray-50 p-2 text-center font-medium text-blue-600">
                Complete details
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-10">
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="mb-2 text-lg font-medium text-gray-700"
            >
              Enter your date of birth
            </label>
            <input
              type="date"
              placeholder="Enter date of birth"
              onChange={(e) => setDate(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 px-2 py-4
                  font-medium outline-none focus:border-blue-500`}
            />
            {dateError && <span className="text-red-500">{dateError}</span>}
          </div>
          <div className="mt-8">
            <button
              className="rounded-2xl bg-green-900 px-6 py-1 font-semibold text-white"
              onClick={dateHandler}
            >
              Set Date
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="mt-10">
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="mb-2 text-lg font-medium text-gray-700"
            >
              Enter your phone number
            </label>
            <input
              type="text"
              placeholder="e.g 0412345678"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 px-2 py-4
                  font-medium outline-none focus:border-blue-500`}
            />
            {phoneNumberError && (
              <span className="text-red-500">{phoneNumberError}</span>
            )}
          </div>
          <div className="mt-8">
            <button
              className="rounded-2xl bg-green-900 px-6 py-1 font-semibold text-white"
              onClick={phoneNumberHandler}
            >
              Set Number
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="mt-10">
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="mb-2 text-lg font-medium text-gray-700"
            >
              Add your billing address
            </label>
            <input
              type="text"
              placeholder="e.g 1/23 John St"
              onChange={(e) => setBillingAddress(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 px-2 py-4
                  font-medium outline-none focus:border-blue-500`}
            />
            {billingAddressError && (
              <span className="text-red-500">{billingAddressError}</span>
            )}

            <span className="mt-5 rounded-xl bg-gray-100 p-3">
              <h1 className="text-sm font-semibold text-green-950">
                Your privacy matters to us
              </h1>
              <p className="text-xs font-medium text-gray-700">
                Your address will never be shown publicly, and it is only used
                for account verification and for you receive payments
              </p>
            </span>
          </div>
          <div className="mt-8">
            <button
              className="rounded-2xl bg-green-900 px-6 py-2 font-semibold text-white"
              onClick={billingAddressHandler}
            >
              Add billing address
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
