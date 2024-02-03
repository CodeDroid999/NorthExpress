import { db } from '../../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

export default function CompletionRate({ reviews, userId }) {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, 'assignments'),
      where('tutor.userId', '==', userId)
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedAssignments = []

      querySnapshot.forEach(async (doc) => {
        const data = doc.data()

        const id = doc.id

        updatedAssignments.push({ id, ...data })
      })

      setAssignments(updatedAssignments)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [userId])
  const positiveReviews = reviews?.filter((review) => review.rating >= 4)
  const totalPositiveReviews = positiveReviews.length
  const completedTasks = assignments?.filter((assignment) => assignment.status === 'Completed')
  const totalJobsCompleted = completedTasks.length
  function calculateJobCompletionRate(
    totalPositiveReviews,
    totalJobsCompleted
  ) {
    if (totalJobsCompleted === 0) {
      return 0
    }

    let completionRate = (totalPositiveReviews / totalJobsCompleted) * 100

    completionRate = Math.min(100, Math.max(0, completionRate))

    completionRate = Math.floor(completionRate)

    return completionRate
  }

  return (
    <div>
      <div className="flex flex-row font-medium ">
        <span className="text-gray-800">
          {calculateJobCompletionRate(totalPositiveReviews, totalJobsCompleted)}
          %
        </span>
        <span className="ml-1 text-gray-600">Success Rate</span>
      </div>
    </div>
  )
}
