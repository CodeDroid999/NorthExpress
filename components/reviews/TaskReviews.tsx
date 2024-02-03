import StarRating from 'components/profile/Reviews/StarRating'
import { db } from '../../firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import profile from 'public/profile.jpeg'
import Link from 'next/link'

export default function TaskReviews({ assignmentId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('Student')

  useEffect(() => {
    if (assignmentId) {
      setLoading(true)
      const reviewsRef = collection(db, 'reviews')

      // Fetch assignment's reviews
      const reviewsQuery = query(reviewsRef, where('assignmentId', '==', assignmentId))

      const unsubscribe = onSnapshot(reviewsQuery, async (querySnapshot) => {
        const reviewsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const senderSnapshot = await getDocs(
              query(
                collection(db, 'users'),
                where('userId', '==', doc.data().senderId)
              )
            )
            const senderData = senderSnapshot.docs[0].data()

            return {
              id: doc.id,
              ...doc.data(),
              reviewer: senderData,
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
  }, [assignmentId])

  const taskerReviews = reviews.filter(
    (review) => review.senderId === review.tutorId
  )
  const studentReviews = reviews.filter(
    (review) => review.senderId === review.studentId
  )

  return (
    <div className="my-3 w-full">
      {reviews.length > 0 && (
        <div className="w-full">
          <h1 className="text-sm font-bold uppercase text-green-950">Reviews</h1>
          <div className="my-3 flex flex-row space-x-4 text-lg font-medium text-gray-400">
            <span
              className={`${activeTab === 'Student'
                  ? 'border-b-blue-600 text-green-950'
                  : 'border-none'
                } cursor-pointer border border-x-transparent border-t-transparent px-3`}
              onClick={() => setActiveTab('Student')}
            >
              Student
            </span>
            <span
              className={`${activeTab === 'Tutor'
                  ? 'border-b-blue-600 text-green-950'
                  : 'border-none'
                } cursor-pointer border border-x-transparent border-t-transparent px-3`}
              onClick={() => setActiveTab('Tutor')}
            >
              Tutor
            </span>
          </div>
          {activeTab == 'Tutor' && (
            <div>
              {taskerReviews.length === 0 ? (
                <div>
                  <h1 className="mt-5 font-medium text-green-950">
                    No review yet!
                  </h1>
                </div>
              ) : (
                <div>
                  <div className="w-full">
                    <div className="flex flex-1 flex-row items-center">
                      <Link
                        href={`/public-profile/${taskerReviews[0].reviewer.userId}`}
                      >
                        <Image
                          src={
                            taskerReviews[0].reviewer.profilePicture || profile
                          }
                          width={45}
                          height={45}
                          alt="profile"
                          className="h-[45px] w-[45px] rounded-full object-cover"
                        />
                      </Link>
                      <Link
                        href={`/public-profile/${taskerReviews[0].reviewer.userId}`}
                      >
                        <h1 className="ml-2 cursor-pointer text-lg font-medium text-green-950">
                          {taskerReviews[0].reviewer.firstName}{' '}
                          {taskerReviews[0].reviewer.lastName}
                        </h1>
                      </Link>
                    </div>

                    <StarRating rating={taskerReviews[0].rating} />
                    <p className="text-base text-gray-800">
                      {taskerReviews[0].review}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab == 'Student' && (
            <div>
              {studentReviews.length === 0 ? (
                <div>
                  <h1 className="mt-5 font-medium text-green-950">
                    No review yet!
                  </h1>
                </div>
              ) : (
                <div>
                  <div className="w-full">
                    <div className="flex flex-1 flex-row items-center">
                      <Link
                        href={`/public-profile/${studentReviews[0].reviewer.userId}`}
                      >
                        <Image
                          src={
                            studentReviews[0].reviewer.profilePicture || profile
                          }
                          width={45}
                          height={45}
                          alt="profile"
                          className="h-[45px] w-[45px] rounded-full object-cover"
                        />
                      </Link>
                      <Link
                        href={`/public-profile/${studentReviews[0].reviewer.userId}`}
                      >
                        <h1 className="ml-2 cursor-pointer text-lg font-medium text-green-950">
                          {studentReviews[0].reviewer.firstName}{' '}
                          {studentReviews[0].reviewer.lastName}
                        </h1>
                      </Link>
                    </div>

                    <StarRating rating={studentReviews[0].rating} />
                    <p className="text-base text-gray-800">
                      {studentReviews[0].review}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
