import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'

export default function AddReview({ tutorDetails, assignmentId, student, assignmentData }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const { user } = UserAuth()
  const userId = user?.userId
  const studentId = student.userId
  const tutorId = tutorDetails.userId
  const router = useRouter()

  let firstName: string
  let lastName: string
  let profilePic: string

  if (studentId === userId) {
    firstName = tutorDetails.firstName
    lastName = tutorDetails.lastName
    profilePic = tutorDetails.profilePicture
  } else if (tutorId === userId) {
    firstName = student.firstName
    lastName = student.lastName
    profilePic = student.profilePicture
  }

  const handleRatingClick = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmit = async () => {
    if (!rating) {
      return
    }

    let receiverId: string

    if (studentId === userId) {
      receiverId = tutorId
    } else if (tutorId === userId) {
      receiverId = studentId
    }

    await addDoc(collection(db, 'reviews'), {
      rating,
      review,
      timestamp: serverTimestamp(),
      studentId,
      tutorId,
      assignmentId,
      senderId: userId,
      receiverId,
    })

    const taskRef = doc(db, 'assignments', assignmentId)

    if (studentId === userId) {
      await updateDoc(taskRef, {
        posterReview: true,
      })
    } else if (tutorId === userId) {
      await updateDoc(taskRef, {
        taskerReview: true,
      })
    }

    await addDoc(collection(db, 'notifications'), {
      receiverId: receiverId,
      senderId: user.userId,
      type: 'Review',
      content: 'has reviewed you on',
      assignmentTitle: assignmentData.title,
      assignmentId,
      read: false,
      createdAt: serverTimestamp(),
    })
    if (receiverId === studentId) {
      await addDoc(collection(db, 'mail'), {
        to: student?.email,
        message: {
          subject: 'New Review',
          html: `${tutorDetails?.firstName} has reviewed you on ${assignmentData.title}`,
        },
      })
    } else if (receiverId === tutorId) {
      await addDoc(collection(db, 'mail'), {
        to: tutorDetails?.email,
        message: {
          subject: 'New Review',
          html: `${student?.firstName} has reviewed you on ${assignmentData.title}`,
        },
      })
    }
    toast.success('Your review has been sent')
    setIsFormOpen(false)
    router.reload()
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full rounded-full bg-green-900 px-4 py-2 text-center font-semibold text-white"
      >
        Leave review
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="w-full max-w-[450px] rounded-lg bg-white p-3 shadow-2xl md:p-5">
            <div
              className={`flex
               flex-row justify-between`}
            >
              <div className="flex-1 text-center text-base font-medium text-gray-800">
                Write Review
              </div>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>

            <div className="mt-5 flex flex-col items-center">
              <div className="flex w-full flex-row justify-center">
                <Image
                  src={profilePic}
                  alt="tutor"
                  height={55}
                  width={55}
                  className="h-[55px] w-[55px] rounded-full object-cover"
                />
              </div>
              <p className="my-1 font-medium text-gray-600">
                How would you rate your experience with {firstName} {lastName}?
              </p>

              <div className="my-2 flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    size={32}
                    className={`cursor-pointer ${rating >= value ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    onClick={() => handleRatingClick(value)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-base font-medium text-green-950">
                Leave a public review (Optional)
              </h1>
              <p className="mb-3 text-sm font-medium text-green-950">
                {firstName} {lastName} will see your name and what you write
              </p>
              <textarea
                placeholder="Leave a review"
                onChange={(e) => setReview(e.target.value)}
                className={`h-32 w-full rounded-lg border bg-gray-50 p-2
              font-normal outline-none `}
              />
            </div>
            <div className="mt-5">
              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-green-900 p-3 text-center  font-medium text-white "
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
