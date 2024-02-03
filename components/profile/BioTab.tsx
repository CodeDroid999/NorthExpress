import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const Bio = () => {
  const { user } = UserAuth()
  const [bio, setBio] = useState(user?.aboutDescription)
  const [bioError, setBioError] = useState('')

  const handleSave = async (e: any) => {
    e.preventDefault()
    let hasError = false
    if (!bio) {
      setBioError('Field is empty')
      hasError = true
    } else {
      setBioError('')
    }
    if (hasError) {
      return
    }
    const q = query(
      collection(db, 'users'),
      where('userId', '==', user?.userId)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        aboutDescription: bio,
      })
    }
    toast.success('Bio updated')
  }

  return (
    <div className="w-full rounded bg-blue-100 p-4">
      <div>
        <h3 className="text-2xl font-medium text-green-950">Bio</h3>

        <div className="mt-2 flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            placeholder="Write something about yourself"
            onChange={(e) => setBio(e.target.value)}
            className={`h-36 w-full rounded-lg border bg-gray-50 p-2
               outline-none focus:border-blue-500`}
          />
          {bioError && <span className="text-red-500">{bioError}</span>}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bio
