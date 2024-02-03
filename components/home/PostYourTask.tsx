import Image from 'next/image'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { MdArrowForward } from 'react-icons/md'
import photo1 from 'public/photo1.jpg'
import Link from 'next/link'

export default function PostYourTask() {
  const list = [
    {
      title: 'Create an account to access professionals',
    },
    {
      title: 'Browse for bids and hire',
    },
    {
      title: 'Get work done and release payments',
    },
  ]
  return (
    <div className="flex flex-col bg-gray-100 pt-4">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-[42px] font-bold leading-[45px] text-green-950 sm:text-[50px] sm:leading-[50px] xl:text-[72px] xl:leading-[75px]">
          Step your work.Its simple.
        </h2>
        <p className="my-4 max-w-[470px] text-[22px] font-medium leading-[28px]  text-green-900">
          Find freelancers and manage projects your way.
        </p>
        <ul className="flex flex-col gap-3">
          {list.map(({ title }) => {
            return (
              <li key={title}>
                <div className="flex items-center gap-2 text-lg">
                  <BsCheckCircle className=" text-2xl text-blue-400" />
                  <h4 className="font-medium text-green-950">{title}</h4>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="w-full flex px-4 py-3 ">
          <div className="container flex justify-center space-x-2">
            <Link
              href="/post-assignment"
              className=" text-white whitespace-nowrap"
            >   <button
              className="rounded-2xl bg-green-900 px-4 py-2 text-white hover:bg-green-900 hover:shadow"
            >
                Post Assignment        </button>

            </Link>
            <Link
              href="/post-assignment"
              className=" text-white whitespace-nowrap"
            >   <button
              className="rounded-2xl bg-green-900 px-4 py-2 text-white hover:bg-green-900 hover:shadow"
            >
                How it works?   </button>

            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
