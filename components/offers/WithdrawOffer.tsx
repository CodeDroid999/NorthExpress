import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function WithdrawOffer({ cancelOffer }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="cursor-pointer rounded-xl bg-gray-200 px-3 py-2 text-sm font-semibold text-blue-600"
      >
        Withdraw
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="max-h-[200px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div
              className={`flex
               flex-row justify-between`}
            >
              <div className="flex-1 text-center text-base font-medium text-gray-800">
                Cancel Bid
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mb-10 mt-5 text-base font-medium text-black">
              <p className="pt-1 pb-2 text-lg">Are you sure you want to cancel this offer?</p>
            </div>
            <div className="flex w-full flex-row space-x-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="flex-1 rounded-full bg-gray-200 px-2 py-1.5 text-center font-medium text-blue-800"
              >
                Back
              </button>
              <button
                onClick={() => cancelOffer()}
                className="flex-1 rounded-full bg-orange-600 px-2 py-1.5 text-center font-medium text-white"
              >
                Cancel Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
