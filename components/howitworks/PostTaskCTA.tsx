import Image from 'next/image'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { MdArrowForward } from 'react-icons/md'
import photo1 from 'public/airtaska-how-it-works.jpg'
import Link from 'next/link'

export default function PostTaskCTA() {
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
    <div className="my-1 flex flex-col rounded-3xl bg-gray-100 py-8 sm:py-16 md:flex-row xl:my-10  xl:px-36">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[42px] font-bold leading-[45px] text-green-950 sm:text-[50px] sm:leading-[50px] xl:text-[72px] xl:leading-[75px]">
          Post a job. <br className="hidden md:block" />
          Get offers. Hire.
        </h2>
        <p className="my-4 max-w-[470px] text-[22px] font-medium leading-[28px]  text-green-900">
          The best marketplace to hire freelancers        </p>
        <div className="my-8 w-full max-w-sm rounded-full bg-green-900 px-4 py-3 sm:max-w-[200px] ">
          <Link
            href="/post-assignment"
            className="flex w-full justify-center text-lg font-semibold text-white"
          >
            Post an assignment for free!
          </Link>
        </div>
      </div>
      <div className="relative ml-0 mt-6 flex flex-1 flex-col items-center justify-center md:ml-8 md:mt-0">
        <Image
          src={photo1}
          alt="assignment"
          className="h-[100%] w-[100%] rounded-xl"
        />

      </div>
    </div>
  )
}
