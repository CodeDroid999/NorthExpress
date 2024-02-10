import { auth, db } from '../../firebase'
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
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { UserAuth } from 'context/AuthContext'
import PersonalInfoTab from 'components/profile/PersonalInfoTab'
import ReviewsTab from 'components/profile/Reviews/ReviewTab'
import EditProfilePicture from 'components/profile/EditProfilePicture'
import Bio from 'components/profile/BioTab'
import SkillsAndEducation from 'components/profile/SkillsTab'
import Navbar from 'components/layout/Navbar'
import Alert from 'components/layout/Alert'
import CustomNavbar from 'components/layout/Navbar'

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-us', { month: 'short' })
  const year = date.getFullYear()
  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th'
  return `${day}${suffix} ${month} ${year}`
}

export default function ProfilePage({
  children,
  hasNewNotifications,
}: {
  children: React.ReactNode
  hasNewNotifications: boolean
}) {
  const [bookings, setAssignments] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic') // Default tab is 'Personal Info tab'
  const [user, setUser] = useState(null)

  const router = useRouter()
  const userId = router.query.id?.toString()
  useEffect(() => {
    if (userId) {
      setLoading(true)
      setLoading(true)
      const q = query(collection(db, 'users'), where('userId', '==', userId))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const userData = doc.data()
          userData.createdAt = formatDate(userData.createdAt.toDate())
          setUser(userData)
        } else {
          setUser(null)
        }
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }

      const assignmentsQuery = query(
        collection(db, 'users'),
        where('tutor.userId', '==', userId)
      )

      // Create a query for reviews
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('tutorId', '==', userId)
      )

      // Fetch bookings
      const assignmentsPromise = getDocs(assignmentsQuery).then((assignmentQuerySnapshot) => {
        const bookings = assignmentQuerySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Additional processing for booking data if needed
          return { id: doc.id, ...data }
        })
        return bookings
      })

      // Fetch reviews
      const reviewsPromise = getDocs(reviewsQuery)
        .then((reviewQuerySnapshot) => {
          const reviews = reviewQuerySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
          return reviews
        })
        .then((reviews) => {
          // Fetch sender data for each review
          const senderPromises = reviews.map((review: any) =>
            getDocs(
              query(
                collection(db, 'users'),
                where('userId', '==', review.senderId)
              )
            ).then((senderSnapshot) => {
              const senderData = senderSnapshot.docs[0].data()
              return { ...review, reviewer: senderData }
            })
          )

          return Promise.all(senderPromises)
        })

      // Wait for both promises to resolve
      Promise.all([assignmentsPromise, reviewsPromise])
        .then(([bookings, reviews]) => {
          setAssignments(bookings)
          setReviews(reviews)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [userId])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const completedAssignments = bookings.filter((booking) => booking.status === 'Completed')
  const myTutorReviews = reviews.filter(
    (review) => review.senderId !== review.tutorId
  )
  return (
    <div>

      <div className="">
        <Alert />
      </div>
      <div className="header_bottom sticky bg-blue-600">
        <CustomNavbar />
      </div>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className=" bg-gray-100 pt-10 antialiased">
          <div className="container mx-auto">
            <div className="flex flex-row p-3 ">
              <div className="flex w-full rounded bg-blue-100 p-3 ">
                <div className="flex flex-col justify-center border-1 border-blue-600" style={{ width: '20vw' }}                >
                  <div className="flex justify-center">
                    <Image
                      src={user?.profilePicture || profile}
                      alt="profile picture"
                      height={200}
                      width={200}
                      className="mr-2 h-[120px] w-[120px] rounded-full object-cover border-1 border-blue-600"
                    />
                  </div>
                  <div>
                    <EditProfilePicture />
                  </div>
                </div>
                <div className="justify-right flex min-h-full w-full flex-col p-3 border-1 border-blue-600">
                  <label htmlFor="DisplayName" className="text-md">Full Name</label>
                  <p className="text-left pl-1 rounded text-md text-gray-900 bg-gray-100">
                    {user?.displayName}
                  </p>
                  <label htmlFor="Email" className="text-md mt-1">Email</label>
                  <p className="text-left pl-1 rounded text-md text-gray-900 bg-gray-100">
                    {user?.email}
                  </p>
                  <label htmlFor="Email" className="text-md mt-1">PhoneNumber</label>
                  <p className="text-left pl-1 rounded text-md text-gray-900 bg-gray-100">
                    {user?.phonenumber}                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  )
}
