import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'
import { BiArrowBack, BiLock } from 'react-icons/bi'
import { useRouter } from 'next/router'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'

import { toast } from 'react-hot-toast'
import { UserAuth } from 'context/AuthContext'

export default function PostSimilarTask({ assignmentData }) {
  const [title, setTitle] = useState(assignmentData?.title)
  const [titleError, setTitleError] = useState('')
  const [dueDate, setDueDate] = useState(assignmentData?.dueDate)
  const [dueDateError, setDueDateError] = useState('')
  const [description, setDescription] = useState(assignmentData?.description)
  const [descriptionError, setDescriptionError] = useState('')
  const [budget, setBudget] = useState(assignmentData?.budget)
  const [budgetError, setBudgetError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { user } = UserAuth()
  const router = useRouter()

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const SubmitForm = async (event: any) => {
    event.preventDefault()
    let hasError = false
    if (!title) {
      setTitleError('* This field is required')
      hasError = true
    } else if (title.length < 10) {
      setTitleError('Must be at least 10 characters')
      hasError = true
    } else {
      setTitleError('')
    }

    if (!dueDate) {
      setDueDateError('* This field is required')
      hasError = true
    } else {
      setDueDateError('')
    }

    if (!description) {
      setDescriptionError('* This field is required')
      hasError = true
    } else if (description.length < 25) {
      setDescriptionError('Must be at least 25 characters')
      hasError = true
    } else {
      setDescriptionError('')
    }

    if (!budget) {
      setBudgetError('* This field is required')
      hasError = true
    } else {
      const budgetValue = Number(budget)
      if (isNaN(budgetValue) || budgetValue < 5 || budgetValue > 9999) {
        setBudgetError('The price must be between $5 and $9999')
        hasError = true
      } else {
        setBudgetError('')
      }
    }

    if (hasError) {
      return
    }

    const docRef = await addDoc(collection(db, 'assignments'), {
      title: title,
      description: description,
      dueDate: dueDate,
      budget: budget,
      status: 'Open',
      createdAt: serverTimestamp(),
      student: {
        userId: user?.userId,
        price: '',
        bookingFee: '',
        finalPrice: '',
      },
      tutor: {
        userId: '',
        price: '',
        serviceFee: '',
        finalPrice: '',
        proposal: '',
      },
      paymentRequested: false,
      paymentReleased: false,
      posterReview: false,
      taskerReview: false,
    })

    const assignmentId = docRef.id

    const usersCollection = collection(db, 'users')
    const querySnapshot = await getDocs(usersCollection)

    const userEmails = []

    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      if (userData.email) {
        userEmails.push(userData.email)
      }
    })
    await addDoc(collection(db, 'mail'), {
      to: 'airtaska@gmail.com',
      bcc: userEmails,
      message: {
        subject: 'New Assignment    ',
        html: `A new assignment has been posted`,
      },
    })

    toast.success('Assignmenthas been posted')

    router.push(`/assignments/${assignmentId}`)

    closeForm()
  }

  const currentDate = new Date().toISOString().split('T')[0]
  return (
    <div className="relative">
      <button
        onClick={openForm}
        className="w-full cursor-pointer rounded-full bg-green-900 px-4 py-2 text-center font-semibold text-white"
      >
        Post Similar Assignment
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className="min-h-[400px] w-full max-w-[400px] rounded-lg bg-white p-4 shadow-2xl">
            <div className={`flex flex-row items-center justify-between`}>
              <span className="flex-1 text-center text-xl font-medium text-gray-700">
                Post Assignment
              </span>
              <AiOutlineClose
                size={20}
                className="cursor-pointer"
                onClick={closeForm}
              />
            </div>
            <form className="w-full pt-4" onSubmit={SubmitForm}>
              <div className="flex flex-col  gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Assignment title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`h-full w-full rounded-lg border bg-gray-50 p-2
                   outline-none focus:border-green-500`}
                  />
                  {titleError && (
                    <span className="text-red-500">{titleError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    placeholder="Enter date"
                    min={currentDate}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`h-full w-full rounded-lg border bg-gray-50 p-2
                   outline-none focus:border-green-500`}
                  />
                  {dueDateError && (
                    <span className="text-red-500">{dueDateError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Write a summary of the key details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`h-32 w-full rounded-lg border bg-gray-50 p-2
               outline-none focus:border-green-500`}
                  />
                  {descriptionError && (
                    <span className="text-red-500">{descriptionError}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-medium text-gray-700"
                  >
                    Budget
                  </label>
                  <div className="relative flex flex-row items-center">
                    <BsCurrencyDollar
                      size={20}
                      className="absolute left-0 mx-1 text-green-950 "
                    />
                    <input
                      placeholder="Enter budget"
                      onChange={(e) => setBudget(e.target.value)}
                      value={budget}
                      className={`h-full w-full rounded-lg border bg-gray-50 py-2 pl-8
           outline-none focus:border-green-500`}
                    />
                  </div>

                  {budgetError && (
                    <span className="text-red-500">{budgetError}</span>
                  )}
                </div>
                <div className="mt-5 flex flex-row space-x-3 font-semibold">
                  <button
                    className="flex-1 rounded-xl bg-gray-100 py-2 text-center text-green-900"
                    onClick={closeForm}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-green-900 py-2 text-center text-white"
                  >
                    Post assignment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
