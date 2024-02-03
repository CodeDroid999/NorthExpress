import Image from 'next/image'
import React from 'react'
import photo1 from 'public/photo1.jpg'
import Link from 'next/link'

export default function SetPrice() {
  return (
    <div className="my-4 flex flex-col rounded-3xl bg-white py-8 sm:py-16 md:flex-row xl:my-10  xl:px-36">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-[42px] font-bold leading-[45px] text-green-950 sm:text-[50px] sm:leading-[50px] xl:text-[72px] xl:leading-[75px]">
          Set your price
        </h2>
        <p className="my-4 max-w-[470px] text-[22px] font-medium leading-[28px]  text-green-950">
          Found a job youre up for? Set your price and make a bid. You can
          adjust and discuss it later if you need to.
        </p>

        <div className="my-8 w-full max-w-sm rounded-full bg-blue-100 px-4 py-3 sm:max-w-[200px] ">
          <Link
            href="/signup"
            className="flex w-full justify-center text-lg font-semibold text-blue-800"
          >
            Join QualityunitedWriters
          </Link>
        </div>
      </div>
      <div className="relative ml-0 mt-6 flex flex-1  md:ml-8 md:mt-0">
        <Image
          src={photo1}
          alt="assignment"
          className="h-[100%] w-[100%] rounded-xl"
        />
      </div>
    </div>
  )
}
