import React from 'react'
import Image from 'next/image'

export default function ScrollCTA() {
  return (
    <div>
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-5 mt-5 grid lg:grid-cols-7 lg:items-center lg:gap-x-8 xl:gap-x-12">
          <div className="lg:col-span-3">
            <h1 className="block pt-3 text-4xl font-bold text-green-900 sm:text-4xl md:text-5xl lg:text-6xl ">
              Post your first assignment in seconds
            </h1>
            <p className="mt-3 text-2xl text-gray-800 dark:text-gray-400">
            Working with the best doesnt have to be expensive.
            </p>
            <ul className="my-3">
              <li>
                <p className="my-2 block p-3 text-xl">
                  <span className="w-10 rounded-full bg-blue-100 px-2">1</span>{' '}
                  Describe what you need done
                </p>
              </li>
              <li>
                <p className="my-2 block p-3 text-xl">
                  <span className="w-10 rounded-full bg-blue-100 px-2">2</span>{' '}
                  Set your budget
                </p>
              </li>
              <li>
                <p className="my-2 block p-3 text-xl">
                  <span className="w-10 rounded-full bg-blue-100 px-2">3</span>{' '}
                  Receive quotes and pick the best Tutor
                </p>
              </li>
            </ul>

            <div className="mt-5 flex flex-col items-center  gap-2 px-3 sm:flex-row sm:gap-3 lg:mt-8">
              <a
                className="inline-flex w-full items-center justify-center gap-x-3 rounded-md border border-transparent bg-blue-600 px-3 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 sm:w-auto"
                href="#"
              >
                Post your assignment
              </a>
            </div>
          </div>

          <div className="m-5 mt-10 inline  items-center  justify-center lg:col-span-4 lg:mt-0">
            <div className="w-100 mt-8 inline-flex items-center justify-center bg-blue-100 px-12">
              <Image
                src="https://i.postimg.cc/HxJ5xQW1/scroll.jpg"
                height="130"
                width="450"
                alt="GFG logo served from external URL"
              />
            </div>
            <div className="mt-7 flex flex-col items-center  gap-2 px-3 sm:flex-row sm:gap-3 lg:mt-8">
              <a
                className="hover:bg-blue-70 inline-flex w-full items-center justify-center gap-x-3 rounded-md border border-transparent  px-3 px-4 py-3  text-center font-medium text-black transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 sm:w-auto"
                href="#"
              >
                Learn how QualityunitedWriters works
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <path
                    d="M24.5303 6.53033C24.8232 6.23744 24.8232 5.76256 24.5303 5.46967L19.7574 0.696699C19.4645 0.403806 18.9896 0.403806 18.6967 0.696699C18.4038 0.989593 18.4038 1.46447 18.6967 1.75736L22.9393 6L18.6967 10.2426C18.4038 10.5355 18.4038 11.0104 18.6967 11.3033C18.9896 11.5962 19.4645 11.5962 19.7574 11.3033L24.5303 6.53033ZM0 6.75H24V5.25H0V6.75Z"
                    fill="#0A65FC"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
