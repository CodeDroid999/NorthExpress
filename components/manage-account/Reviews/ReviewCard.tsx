import React from 'react'
import Image from 'next/image'
import StarRating from './StarRating'
import profile from 'public/profile.jpeg'
import Link from 'next/link'

const ReviewCard = ({ review }) => {
  const reviewer = review.reviewer
  return (
    <div className="mb-4 rounded-lg border bg-white p-4">
      <div className="item-left flex  flex-grow justify-start">
        <div className="align-center flex justify-center">
          <Link href={`/public-profile/${reviewer.userId}`}>
            {' '}
            <Image
              src={reviewer.profilePicture || profile}
              alt="profile"
              width={40}
              height={40}
              className="h-[40px] w-[40px] cursor-pointer rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="top flex flex-col whitespace-nowrap">
          <Link href={`/public-profile/${reviewer.userId}`}>
            <span className="text-md ml-1 mr-1 font-semibold text-blue-900">
              {reviewer.firstName} {reviewer.lastName}
            </span>
          </Link>
          <p className="ml-1 mr-1 text-xs text-green-950">
            {new Date(review.timestamp?.toMillis()).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }
            )}
          </p>
        </div>
      </div>
      <hr className="mb-1 mt-1 bg-blue-800" />
      <p className="pt-1 pb-2 text-lg">{review.review}</p>
      <div className="mt-1 flex flex-row space-x-2">
        <div className="text-md">
          <StarRating rating={review.rating} />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex h-1 w-1 items-center justify-center rounded-full bg-gray-500"></div>
        </div>
        <div className="text-md text-blue-800">{review.rating}/5</div>
      </div>
    </div>
  )
}

export default ReviewCard
