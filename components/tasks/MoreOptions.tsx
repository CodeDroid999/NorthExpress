import React, { useState } from 'react'
import WithdrawFromTask from './WithdrawFromTask'
import Link from 'next/link'
import PostSimilarTask from './PostSimilarTask'
import { AiFillCaretDown } from 'react-icons/ai'
import { UserAuth } from 'context/AuthContext'

export default function MoreOptions({ assignmentData, student, assignmentId }) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = UserAuth()
  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-2 flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-gray-200 px-3 py-2 text-base font-semibold text-blue-950 outline-none ${isOpen ? 'rounded-b-none' : 'rounded-b-xl'
          }`}
      >
        <span>More Options</span>
        <span>
          <AiFillCaretDown size={18} />
        </span>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-0.5 rounded-xl rounded-t-none bg-gray-100 p-3">
          <PostSimilarTask assignmentData={assignmentData} />
          {!assignmentData.paymentRequested &&
            assignmentData.tutor.userId === user?.userId &&
            assignmentData.status === 'Assigned' && (
              <WithdrawFromTask
                assignmentId={assignmentId}
                assignmentData={assignmentData}
                student={student}
              />
            )}
        </div>
      )}
    </div>
  )
}
