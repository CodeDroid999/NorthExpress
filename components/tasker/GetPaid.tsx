import React from 'react'
import Image from 'next/image'
import photo4 from 'public/photo4.jpg'
import Link from 'next/link'

export default function GetPaid() {
  return (
    <div className="flex flex-col bg-white py-6 sm:py-12 md:flex-row md:items-center xl:my-10 xl:px-36">
      <div className="flex flex-1 ">
        <Image
          src={photo4}
          alt="features"
          className="h-[400px] w-[100%] rounded-2xl  md:h-[500px]  md:w-[500px] "
        />
      </div>
      <div className="relative ml-0 mt-5 flex flex-1 flex-col items-start justify-start md:ml-5 md:mt-0 xl:ml-10">
        <div>
          <h1 className="mb-5 text-[45px] font-bold leading-[42px] text-green-950 xl:text-[55px] xl:leading-[50px]">
            Complete the job. Get paid. Easy.
          </h1>
          <p className="my-4 max-w-[470px] text-[22px] font-medium leading-[28px]  text-green-950">
            When you mark an assignment as complete, a Request for Payment is sent
            directly to the job student so they can release payment instantly.
          </p>
        </div>

        <div className="my-3 w-full max-w-sm rounded-full bg-blue-100 px-4 py-3 sm:max-w-[250px] ">
          <Link
            href="/signup"
            className="flex w-full justify-center text-lg font-semibold text-blue-800"
          >
            Join QualityunitedWriters
          </Link>
        </div>
      </div>
    </div>
  )
}
