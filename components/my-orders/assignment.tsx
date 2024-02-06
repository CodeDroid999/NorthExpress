import Link from 'next/link'
import React from 'react'

export default function booking({ booking }) {
  return (
    <Link
      href={`/order/${booking.id}`}
      className="flex h-[100px] w-full flex-1 flex-col justify-between rounded-md bg-gray-50 p-2"
    >
      <div className="flex flex-row justify-between text-lg font-semibold text-green-950">
        <span className="flex-1 ">{booking.title}</span>
        <span className="">${booking.budget}</span>
      </div>
      <div>
        <span
          className={`${booking.status === 'Completed' ? 'text-blue-800' : 'text-blue-600'
            } font-semibold`}
        >
          {booking.status}
        </span>
      </div>
    </Link>
  )
}
