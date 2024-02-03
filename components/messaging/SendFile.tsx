import { db, storage } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React from 'react'
import { ImAttachment } from 'react-icons/im'

export default function SendFile({ userId, chatId }) {
  const handleSendFile = async (event: any) => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) {
      return
    }

    const chatRef = doc(db, 'chats', chatId)

    // Upload file to Firebase Storage
    const storageRef = ref(storage, `chatFiles/${selectedFile.name}`)
    await uploadBytes(storageRef, selectedFile)
    const fileUrl = await getDownloadURL(storageRef)

    // Add file message to the messages collection
    await addDoc(collection(chatRef, 'messages'), {
      content: '', // You can set a default content for file messages
      fileUrl: fileUrl,
      timestamp: serverTimestamp(),
      senderId: userId,
    })

    // Update chat document
    await updateDoc(chatRef, {
      lastMessage: 'File shared', // Update the last message text
      lastMessageTimestamp: serverTimestamp(),
    })
  }
  return (
    <div>
      <label htmlFor="attachment">
        <ImAttachment size={20} className="cursor-pointer" />
      </label>
      <input
        id="attachment"
        type="file"
        accept=".pdf,.docx,image/*"
        onChange={handleSendFile}
        className="hidden"
      />
    </div>
  )
}
