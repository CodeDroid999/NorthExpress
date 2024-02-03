import React from 'react'

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5

  const renderStar = (index) => {
    if (index < fullStars) {
      return (
        <span key={index} className="text-xl text-yellow-500">
          &#9733;
        </span>
      ) // Full star
    } else if (index === fullStars && hasHalfStar) {
      return (
        <span key={index} className="text-xl text-yellow-500">
          &#9733;
        </span>
      ) // Half star
    } else {
      return (
        <span key={index} className="text-xl text-gray-300">
          &#9733;
        </span>
      ) // Empty star
    }
  }

  return (
    <div className="flex items-center  space-x-1">
      {Array.from({ length: 5 }).map((_, index) => renderStar(index))}
    </div>
  )
}

export default StarRating
