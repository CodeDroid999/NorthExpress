import { db } from '../../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { MdStar } from 'react-icons/md'
import CompletionRate from './CompletionRate'

export default function TaskerRating({ userId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (userId) {
      setLoading(true)
      const reviewsRef = collection(db, 'reviews')

      // Fetch assignment's reviews
      const reviewsQuery = query(reviewsRef, where('receiverId', '==', userId))

      const unsubscribe = onSnapshot(reviewsQuery, async (querySnapshot) => {
        const reviewsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
        )
        setReviews(reviewsData)
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  const taskerReviews: any = reviews.filter(
    (review) => review.receiverId === review.tutorId
  )
  const totalRatings = taskerReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  )
  const calculateAverageRating = () => {
    const averageRating = totalRatings / taskerReviews.length
    return averageRating.toFixed(1)
  }

  return (
    <div>
      {taskerReviews.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-1 text-[18px] font-medium leading-[14px] text-yellow-500">
            {calculateAverageRating()} <MdStar />{' '}
            <span className=" text-gray-600">({taskerReviews.length})</span>{' '}
          </div>
          <CompletionRate reviews={taskerReviews} userId={userId} />
        </div>
      )}
    </div>
  )
}
