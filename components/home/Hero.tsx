import React from 'react'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'

export default function Hero() {
  return (
    <div className="sm:px-18 my-4 flex h-[70vh] flex-col-reverse items-center rounded-3xl  bg-violet-100  px-4 py-16  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[40px] font-bold leading-[43px] text-green-950 sm:text-[48px] sm:leading-[48px] md:mt-10 md:text-[84px] md:leading-[72px]">
          The best way to work<br className="hidden md:block" />
        </h2>
        <h2 className="pt-3">
          <span className="text-red-900 text-[30px] font-bold leading-[33px] sm:text-[38px] sm:leading-[38px] md:mt-10 md:text-[74px] md:leading-[62px]">Faster.Precise.Efficient.</span>
        </h2>
        <p className="my-4  max-w-[470px] text-[18px] font-medium leading-[20px] text-gray-950 md:mt-8 md:text-[22px] md:leading-[25px]  xl:max-w-[600px]">
          Avoid outdated Rules.Best candidates.Right Here,Right now.
        </p>

        <div className="flex w-full flex-col md:flex-row md:space-x-6">
          <div className="my-2 w-full max-w-sm rounded-full bg-green-900  px-3 py-3 sm:w-[300px] xl:my-3   xl:py-4" >
            <Link
              href="/post-assignment"
              className="flex w-full flex-row items-center justify-center text-lg font-semibold text-gray-900"
            >
              Post your work for free
              <MdArrowForward size={28} className="ml-3 pt-1 " />
            </Link>
          </div>
          <div className="my-2 w-full max-w-sm rounded-full bg-green-950 px-3 py-3 sm:w-[300px]  xl:my-3  xl:py-4 ">
            <Link
              href="/become-a-tutor"
              className="flex w-full flex-row justify-center text-lg font-semibold text-white"
            >
              Earn money as a tutor
              <MdArrowForward size={28} className="ml-3 pt-1 " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
