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
import { AiOutlineClose } from 'react-icons/ai'

export default function UpdateBankAccount({
  userId,
  accountHolderName,
  accountNumber,
  bsb,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newHolderName, setNewHolderName] = useState(accountHolderName)
  const [newAccountNumber, setNewAccountNumber] = useState(accountNumber)
  const [newBsb, setNewBsb] = useState(bsb)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!newHolderName || !newAccountNumber || !newBsb) {
      return
    }

    const q = query(collection(db, 'users'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        bankAccount: {
          accountNumber: newAccountNumber,
          accountHolderName: newHolderName,
          BSB: newBsb,
        },
      })
    }
    toast.success('Bank account details updated')
    setIsFormOpen(false)
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-2 font-semibold text-blue-800"
      >
        Edit Bank Account
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className=" w-full max-w-[400px] rounded-lg bg-white p-3 shadow-2xl">
            <div
              className={`flex
          cursor-pointer flex-row items-center justify-between`}
            >
              <div className="text-lg font-semibold">
                Update Bank Account Address
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit} className="mt-3">
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
                  value={newHolderName}
                  onChange={(e) => setNewHolderName(e.target.value)}
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
                  value={newAccountNumber}
                  onChange={(e) => setNewAccountNumber(e.target.value)}
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
                  value={newBsb}
                  onChange={(e) => setNewBsb(e.target.value)}
                  className={`h-full w-full rounded-lg border bg-gray-50 p-2
                  font-medium outline-none focus:border-blue-500`}
                />
              </div>
              <button
                type="submit"
                className="bg-green-900 px-3 mb-2 mt-5 w-full rounded-full py-2 font-semibold text-white "
              >
                Update Bank Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
