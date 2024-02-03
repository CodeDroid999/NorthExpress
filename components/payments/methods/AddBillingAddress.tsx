import { UserAuth } from 'context/AuthContext'
import { db } from '../../../firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AddBillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const { user } = UserAuth()
  const userId = user?.userId

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!billingAddress) {
      return
    }

    const q = query(collection(db, 'users'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        billingAddress,
      })
    }
    toast.success('Billing address added')
  }
  return (
    <form onSubmit={handleSubmit}>
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
          className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  font-medium outline-none focus:border-blue-500`}
        />

        <span className="mt-3 rounded-xl bg-gray-100 p-3 md:p-4">
          <h1 className="text-sm font-semibold text-green-950 md:text-base">
            Your privacy matters to us
          </h1>
          <p className="text-xs font-medium text-gray-700 md:text-sm">
            Your address will never be shown publicly, and it is only used for
            account verification and for you receive payments
          </p>
        </span>
      </div>
      <button
        type="submit"
        className="my-2 rounded-full bg-green-900 px-3 py-2 font-semibold text-white "
      >
        Add Billing Address
      </button>
    </form>
  )
}
