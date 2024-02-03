import React from 'react'
import Link from 'next/link'
import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import profile from 'public/profile.jpeg'

interface CardProps {
  title: string
  id: string
  date: string
  status: string
  price: number
  offers: any
  profilePicture: string
  studentId: string
}

const AssignmentCard: React.FC<CardProps> = ({
  title,
  id,
  date,
  status,
  price,
  offers,
  profilePicture,
  studentId,
}) => {
  const { user } = UserAuth()

  return (
    <Link href={`/order/${id}`}>
      <div className="m-2 flex  rounded-lg border bg-white p-2 shadow-sm hover:bg-neutral-100">
        <div className="flex-1">
          <div className="mb-2 flex items-center pr-3">
            <h1 className="text-md max-w-[230px] break-words font-bold text-blue-800 xl:max-w-[300px] ">
              {title}
            </h1>
          </div>
          <div className="flex items-center">
            <svg fill="#9BA0BC" height="16" width="16" viewBox="0 0 24 24">
              <mask
                id="b"
                width="24"
                height="24"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style={{ maskType: 'alpha' }}
              >
                <path d="M0 0h24v24H0z"></path>
              </mask>
              <g mask="url(#b)">
                <path d="M2 20v-3h2V6c0-.55.196-1.02.588-1.412A1.923 1.923 0 0 1 6 4h15v2H6v11h6v3H2Zm13 0a.965.965 0 0 1-.712-.288A.965.965 0 0 1 14 19V9c0-.283.096-.521.288-.713A.967.967 0 0 1 15 8h6a.97.97 0 0 1 .712.287c.192.192.288.43.288.713v10c0 .283-.096.52-.288.712A.965.965 0 0 1 21 20h-6Zm1-3h4v-7h-4v7Z"></path>
              </g>
            </svg>
            <p className="ml-2 text-gray-600">Remote</p>
          </div>
          <div className="flex items-center">
            <svg fill="#9BA0BC" height="16" width="16" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12.725 17.275c.483.483 1.075.725 1.775.725s1.292-.242 1.775-.725c.483-.483.725-1.075.725-1.775s-.242-1.292-.725-1.775C15.792 13.242 15.2 13 14.5 13s-1.292.242-1.775.725C12.242 14.208 12 14.8 12 15.5s.242 1.292.725 1.775Zm-9.138 4.138A1.93 1.93 0 0 0 5 22h14a1.93 1.93 0 0 0 1.413-.587A1.93 1.93 0 0 0 21 20V6c0-.55-.196-1.02-.587-1.412A1.927 1.927 0 0 0 19 4h-1V2h-2v2H8V2H6v2H5c-.55 0-1.021.196-1.413.588A1.925 1.925 0 0 0 3 6v14c0 .55.196 1.021.587 1.413ZM19 20H5V10h14v10Zm0-12H5V6h14v2Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="ml-2 text-gray-600">{date}</p>
          </div>

          <div className="flex items-center">
            <p className="ml-2 font-bold text-blue-700">
              {offers.some(
                (offer: any) => user && offer.userId === user?.userId
              ) ? (
                <span className="text-blue-900">Bidded</span>
              ) : (
                <span>{status}</span>
              )}
              <span className="ml-2 font-medium text-gray-600">
                {offers?.length == 1 ? (
                  <span>{offers?.length} Bid</span>
                ) : (
                  <span>{offers?.length} Bids</span>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="item-center flex flex-col justify-start">
          <div className="flex flex-grow flex-col items-center justify-start">
            <div className="top whitespace-nowrap">
              <span className="text-md ml-1 mr-1 font-bold text-blue-800">
                ${price}
              </span>
            </div>
            <div className="flex flex-grow"></div>
            <div className="bottom  flex justify-end">
              <Link href={`/public-profile/${studentId}`}>
                <Image
                  src={profilePicture || profile}
                  alt="profile"
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AssignmentCard
