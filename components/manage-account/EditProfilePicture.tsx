import { UserAuth } from 'context/AuthContext'
import { db, storage } from '../../firebase'
import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { toast } from 'react-hot-toast'

export default function EditProfilePicture() {
  const { user } = UserAuth()

  const [uploading, setUploading] = useState(false)

  const handleUpload = async (event: any) => {
    const selectedFile = event.target.files[0]

    if (!selectedFile) return

    setUploading(true)

    const storageRef = ref(storage, `profilePictures/${user.userId}`)
    await uploadBytes(storageRef, selectedFile)

    const downloadURL = await getDownloadURL(storageRef)
    const q = query(collection(db, 'users'), where('userId', '==', user.userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0]
      const userDocRef = doc(db, 'users', docSnapshot.id)
      await updateDoc(userDocRef, {
        profilePicture: downloadURL,
      })
    }

    setUploading(false)
    toast.success('Picture uploaded')
  }
  return (
    <div className="flex justify-center">
      <label htmlFor="profilePicInput" className="p-1 font-semibold ">
        {uploading ? (
          'Uploading...'
        ) : (
          <div className="w-42 h-42 flex flex-auto flex-row items-center space-x-2 rounded bg-gradient-to-r from-gray-800  to-gray-700 p-2  text-gray-100 shadow-lg    hover:text-green-400 ">
            <FiEdit2 />
            <span className="whitespace-nowrap text-xs ">Edit Profile Pic</span>
          </div>
        )}
      </label>
      <input
        id="profilePicInput"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
    </div>
  )
}
