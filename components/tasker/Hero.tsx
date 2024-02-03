import React from 'react'
import Image from 'next/image'
import { MdCheck } from 'react-icons/md'
import photo2 from 'public/photo2.jpg'
import Link from 'next/link'

export default function Hero() {
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
      title: 'Grow your business and client base',
    },
  ]
  return (
    <div className="my-4 flex flex-col-reverse  rounded-3xl bg-green-900 px-3 py-8 sm:px-4 sm:py-16  md:flex-row  md:px-8 xl:my-10 xl:px-36  xl:py-20">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[40px] font-bold  text-white sm:text-[55px] sm:leading-[55px] ">
          Be your own boss
        </h2>
        <p className="my-5 text-lg font-medium text-white">
          Whether youre a genius spreadsheet guru or a diligent carpenter, find
          your next job on QualityunitedWriters.
        </p>
        <ul className="flex flex-col gap-2">
          {list.map(({ title }) => {
            return (
              <li key={title}>
                <div className="flex items-center gap-2 text-lg">
                  <MdCheck className=" text-xl text-white" />
                  <h4 className="font-medium text-white">{title}</h4>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="my-8 w-full max-w-sm rounded-full bg-green-950 px-4 py-2 sm:max-w-[250px] sm:py-3 ">
          <Link
            href="/signup"
            className="flex w-full justify-center text-lg font-semibold text-white"
          >
            Join QualityunitedWriters
          </Link>
        </div>
      </div>
      <div className="relative mb-6 ml-0 flex flex-1 flex-col items-center justify-center  md:mb-0 md:ml-8 ">
        <Image
          src={photo2}
          alt="assignment"
          className="h-[400px] w-[100%] rounded-2xl  md:h-[500px] lg:w-[400px] "
        />
      </div>
    </div>
  )
}
