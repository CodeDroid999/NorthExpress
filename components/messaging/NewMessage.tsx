import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdSend } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function NewMessage({
  customerId,
  studentId,
  assignmentData,
  assignmentId,
  student,
  tutor,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const { user } = UserAuth()
  const router = useRouter()

  let receiverId: string

  if (customerId === user.userId) {
    receiverId = studentId
  } else if (studentId === user.userId) {
    receiverId = customerId
  }

  const sendMessage = async (e: any) => {
    e.preventDefault()

    if (!message) {
      return
    }

    const participants = [studentId, customerId]
    participants.sort() // Sort to ensure consistent chat IDs

    const chatQuery = query(
      collection(db, 'chats'),
      where('participants', '==', participants)
    )

    const querySnapshot = await getDocs(chatQuery)

    let existingChatRef: any

    if (!querySnapshot.empty) {
      existingChatRef = querySnapshot.docs[0].ref
    } else {
      // Create a new chat since no existing chat was found
      const newChatRef = await addDoc(collection(db, 'chats'), {
        participants: participants,
        lastMessage: message,
        lastMessageTimestamp: serverTimestamp(),
      })

      existingChatRef = newChatRef
    }

    // Add the message to the messages subcollection of the chat
    await addDoc(collection(existingChatRef, 'messages'), {
      content: message,
      timestamp: serverTimestamp(),
      senderId: user.userId,
      receiverId: receiverId,
      read: false,
    })

    await addDoc(collection(db, 'notifications'), {
      receiverId: receiverId,
      senderId: user.userId,
      type: 'Message',
      content: 'has sent you a message on',
      assignmentTitle: assignmentData.title,
      assignmentId,
      read: false,
      createdAt: serverTimestamp(),
    })
    if (receiverId === studentId) {
      await addDoc(collection(db, 'mail'), {
        to: student?.email,
        message: {
          subject: 'New Message',
          html: `${tutor?.firstName} has sent you a message on ${assignmentData.title}`,
        },
      })
    } else if (receiverId === customerId) {
      await addDoc(collection(db, 'mail'), {
        to: tutor?.email,
        message: {
          subject: 'New Message',
          html: `${student?.firstName} has sent you a message on ${assignmentData.title}`,
        },
      })
    }
    // Update the existing chat document with the latest message details
    await updateDoc(existingChatRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
    })

    const chatId = existingChatRef.id
    router.push(`/chats/${chatId}`)

    toast.success('Message sent')

    setIsFormOpen(false)
    setMessage('')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen(true)}
        className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-blue-700"
      >
        Message Customer
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 ">
          <div className=" w-full max-w-[500px] rounded-lg bg-white p-4 shadow-2xl">
            <div className="flex flex-row justify-between">
              <span className="text-base font-medium text-green-950">
                New Message
              </span>
              <AiOutlineClose
                size={18}
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>
            <div className="mt-5">
              <form className="relative mx-auto mb-2 flex w-full max-w-[900px] flex-row items-center rounded-xl border border-gray-400 ">
                <input
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mr-7 h-16 w-full rounded-xl p-2 outline-none"
                />
                <button className="absolute right-0 mr-1" onClick={sendMessage}>
                  <MdSend size={24} className="cursor-pointer" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
