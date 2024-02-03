import { db } from '../../../firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export default function Earned() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const userId = router.query.id?.toString()
  useEffect(() => {
    if (userId) {
      setLoading(true)
      const paymentsRef = collection(db, 'payments')

      // Fetch user's outgoing payments
      const paymentsQuery = query(paymentsRef, where('tutorId', '==', userId))

      const unsubscribe = onSnapshot(paymentsQuery, async (querySnapshot) => {
        const paymentsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
        )
        // Update the state with all payments
        setPayments(paymentsData)

        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  const getPayment = payments.reduce(
    (total, payment) => total + parseFloat(payment.tutorAmount.finalPrice),
    0
  )
  const netPayment = getPayment.toFixed(2)
  return (
    <div className="w-full">
      {loading ? (
        <div className="mt-40 flex items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-end">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold text-green-950 ">
                Net earned
              </h1>
              <h2 className="text-3xl font-bold text-blue-400">
                ${netPayment}
              </h2>
            </div>
          </div>
          <div>
            {payments.length === 0 ? (
              <div className="mt-28 flex flex-col items-center">
                <h1 className="text-xl font-semibold text-green-950 ">
                  You havent earned from any assignments yet. But lets change that!
                </h1>
                <div className="mt-6">
                  <Link
                    href="/browse-assignments"
                    className="rounded-full bg-green-900 px-4 py-2 font-semibold text-white"
                  >
                    Browse Assignments
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-5 w-full rounded-md bg-gray-50 p-2">
                <ul>
                  {payments.map((payment) => (
                    <li
                      key={payment.id}
                      className="flex flex-row justify-between"
                    >
                      <span
                        className="cursor-pointer text-blue-800"
                        onClick={() => router.push(`/assignments/${payment.assignmentId}`)}
                      >
                        {payment.assignmentTitle}
                      </span>
                      <span className="font-medium text-green-950">
                        ${payment.tutorAmount.finalPrice}
                      </span>
                      <span className="text-sm text-gray-700">
                        {' '}
                        {new Date(
                          payment.createdAt.toMillis()
                        ).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}{' '}
                        {new Date(
                          payment.createdAt.toMillis()
                        ).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
