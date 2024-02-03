import Link from 'next/link'
import React from 'react'

export default function assignment({ assignment }) {
  return (
    <Link
      href={`/order/${assignment.id}`}
      className="flex h-[100px] w-full flex-1 flex-col justify-between rounded-md bg-gray-50 p-2"
    >
      <div className="flex flex-row justify-between text-lg font-semibold text-green-950">
        <span className="flex-1 ">{assignment.title}</span>
        <span className="">${assignment.budget}</span>
      </div>
      <div>
        <span
          className={`${assignment.status === 'Completed' ? 'text-blue-800' : 'text-blue-600'
            } font-semibold`}
        >
          {assignment.status}
        </span>
      </div>
    </Link>
  )
}
