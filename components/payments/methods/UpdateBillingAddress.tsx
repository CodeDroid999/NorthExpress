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

export default function UpdateBillingAddress({ userId, billingAddress }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newBillingAddress, setNewBillingAddress] = useState(billingAddress)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!newBillingAddress) {
      return
    }

    const q = query(collection(db, 'users'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        billingAddress: newBillingAddress,
      })
    }
    toast.success('Billing address added')
    setIsFormOpen(false)
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-1 font-semibold text-blue-800"
      >
        Edit Billing Address
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className=" w-full max-w-[400px] rounded-lg bg-white p-3 shadow-2xl">
            <div
              className={`flex
      cursor-pointer flex-row items-center justify-between`}
            >
              <div className="text-lg font-semibold text-green-950">
                Update Billing Address
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="mb-2 text-base font-medium text-gray-700"
                >
                  Add your billing address
                </label>
                <input
                  type="text"
                  placeholder="e.g 1/23 John St"
                  onChange={(e) => setNewBillingAddress(e.target.value)}
                  value={newBillingAddress}
                  className={`h-full w-full rounded-lg border bg-gray-50 p-2
                   outline-none focus:border-blue-500`}
                />

                <span className="mb-2 mt-3 rounded-xl bg-gray-100 p-3 md:p-4">
                  <h1 className="text-sm font-semibold text-green-950 md:text-base">
                    Your privacy matters to us
                  </h1>
                  <p className="text-xs font-medium text-gray-700 md:text-sm">
                    Your address will never be shown publicly, and it is only
                    used for account verification and for you receive payments
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
          </div>
        </div>
      )}
    </div>
  )
}
