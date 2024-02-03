import React from 'react'
import ReviewCard from './ReviewCard'
import StarRating from './StarRating'

const ReviewsTab = ({ reviews }) => {
  const calculateAverageRating = () => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRatings / reviews.length
    return averageRating.toFixed(1)
  }

  return (
    <div className="w-full rounded bg-blue-100 p-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Reviews
      </h2>
      <div className=" flex w-full items-center justify-center space-x-2 rounded bg-gray-100 px-4 pt-4">
        <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
          <div className="p-4 md:p-7">
            <h2 className="text-md text-center capitalize text-gray-200">
              {reviews.length}
            </h2>
            <h3 className="text-center  text-sm  text-gray-400">
              Total Reviews
            </h3>
          </div>
        </div>
        <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
          <div className="p-4 md:p-7">
            <div className="flex items-center justify-center">
              <div className="text-md align-center flex justify-center space-x-1 text-center capitalize text-gray-200">
                <div>
                  <StarRating rating={calculateAverageRating()} />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex h-1 w-1 items-center justify-center rounded-full bg-white"></div>
                </div>
                <div> {calculateAverageRating()}</div>
              </div>
            </div>
            <h3 className="text-center  text-sm  text-gray-400">
              Average Rating
            </h3>
          </div>
        </div>
      </div>
      <div className=" flex-column flex w-full rounded bg-white">
        <div
          className="w-full bg-gray-100 p-2"
          style={{ height: '50vh', overflowY: 'auto' }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.length === 0 && <p className="pt-1 pb-2 text-lg">No reviews available.</p>}
        </div>
      </div>
    </div>
  )
}

export default ReviewsTab
