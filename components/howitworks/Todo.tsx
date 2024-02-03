/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { width } from 'components/OpenGraphImage'

const Todo: React.FC = () => {
  const gridData = [
    { title: 'Title 1', imageUrl: '/photo1.jpg' },
    { title: 'Title 2', imageUrl: '/photo2.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    { title: 'Title 3', imageUrl: '/photo3.jpg' },
    // Add more items as needed
  ]

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-x-0">
      {gridData.map((item, index) => (
        <div key={index} className="relative m-2">
          <div className="flex h-full w-full flex-col justify-center  md:mx-2">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="w-full rounded-xl object-cover"
              width={250}
              height={20}
            />
            <div className=" bottom-0 w-full bg-blue-600 bg-opacity-50  py-2 text-center font-bold text-white">
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Todo
