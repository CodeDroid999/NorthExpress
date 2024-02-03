import Image from 'next/image'
import React from 'react'
import { MdCheck } from 'react-icons/md'
import photo2 from 'public/photo2.jpg'
import Link from 'next/link'

export default function BeYourOwnBoss() {
  const list = [
    {
      title: 'Free access to thousands of job opportunities',
    },
    {
      title: 'No subscription or credit fees',
    },
    {
      title: 'Earn extra income on a flexible schedule',
    },
    {
      title: 'Expand your clientele and business',
    },
  ]
  return (
    <div className="bg-green-900 pt-5 pb-5">
      <div className="container flex flex-1 flex-col items-center justify-center pb-4">

        <h1 className="font-bold text-center text-gray-100 text-6xl whitespace-nowrap pb-3">
          Be your own boss
        </h1>
        <div className="row mx-auto flex justify-center align-center pt-4">
          <div className="col-md-4">
            <p className="md:text-5xl md:block text-yellow-600 font-extrabold underline ">
              Find your next job. Earn money as a tutor.
            </p>
          </div>
          <div className="col-md-6">
            <ul className="flex flex-col justify-items-center gap-2">
              {list.map(({ title }) => {
                return (
                  <li key={title}>
                    <div className="flex items-center gap-2 md:text-2xl p-2">
                      <MdCheck className=" text-2xl text-black bg-gray-100 font-bold rounded border shadow" />
                      <h4 className="font-medium text-black pl-3">{title}</h4>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}
