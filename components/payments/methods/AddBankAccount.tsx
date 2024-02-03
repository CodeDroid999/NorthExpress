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

export default function AddBankAccount() {
  const [holderName, setHolderName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bsb, setBsb] = useState('')
  const { user } = UserAuth()
  const userId = user?.userId

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!holderName || !accountNumber || !bsb) {
      return
    }

    const q = query(collection(db, 'users'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        bankAccount: {
          accountNumber,
          accountHolderName: holderName,
          BSB: bsb,
        },
      })
    }
    toast.success('Bank account details added')
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1">
        <label
          htmlFor="holderName"
          className="mb-2 text-base font-medium text-gray-700"
        >
          Account holder Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          onChange={(e) => setHolderName(e.target.value)}
          className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  font-medium outline-none focus:border-blue-500`}
        />
      </div>
      <div className="mb-1">
        <label
          htmlFor="holderName"
          className="mb-2 text-base font-medium text-gray-700"
        >
          Account Number
        </label>
        <input
          type="text"
          placeholder="12345678"
          onChange={(e) => setAccountNumber(e.target.value)}
          className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  font-medium outline-none focus:border-blue-500`}
        />
      </div>
      <div>
        <label
          htmlFor="bsb"
          className="mb-2 text-base font-medium text-gray-700"
        >
          BSB
        </label>
        <input
          type="text"
          placeholder="000-000"
          onChange={(e) => setBsb(e.target.value)}
          className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  font-medium outline-none focus:border-blue-500`}
        />
      </div>
      <button
        type="submit"
        className="mt-3 rounded-full bg-green-900 px-3 py-2 font-semibold text-white "
      >
        Add Bank Account
      </button>
    </form>
  )
}
