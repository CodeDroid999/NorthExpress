import SendFile from 'components/messaging/SendFile'
import { UserAuth } from 'context/AuthContext'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { MdSend } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function Replies({
  customerId,
  studentId,
  assignmentData,
  assignmentId,
  offerId,
  student,
  customer,
}) {
  const [repliesVisible, setRepliesVisible] = useState(false)
  const [replies, setReplies] = useState([])
  const [newReply, setNewReply] = useState('')
  const { user } = UserAuth()

  useEffect(() => {
    const taskRef = doc(db, 'assignments', assignmentId)
    const offerRef = doc(taskRef, 'offers', offerId)
    const repliesCollectionRef = collection(offerRef, 'replies')
    const unsubscribe = onSnapshot(repliesCollectionRef, async (snapshot) => {
      const updatedReplies: any = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const replyData = doc.data()
          const senderSnapshot = await getDocs(
            query(
              collection(db, 'users'),
              where('userId', '==', replyData.senderId)
            )
          )
          const senderData = senderSnapshot.docs[0].data()

          return {
            replyId: doc.id,
            ...replyData,
            senderDetails: senderData,
          }
        })
      )

      updatedReplies.sort(
        (a: any, b: any) => a.timestamp?.toMillis() - b.timestamp?.toMillis()
      )

      setReplies(updatedReplies)
    })

    return () => {
      unsubscribe()
    }
  }, [offerId, assignmentId])

  const sendReply = async (e: any) => {
    e.preventDefault()
    if (!newReply) {
      return
    }
    const taskRef = doc(db, 'assignments', assignmentId)
    const offerRef = doc(taskRef, 'offers', offerId)
    const repliesCollectionRef = collection(offerRef, 'replies')

    // Add the reply document to the 'replies' subcollection
    const newReplyRef = await addDoc(repliesCollectionRef, {
      content: newReply,
      timestamp: serverTimestamp(),
      senderId: user.userId,
    })

    let receiverId: string

    if (customerId === user.userId) {
      receiverId = studentId
    } else if (studentId === user.userId) {
      receiverId = customerId
    }

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
          subject: 'New Reply',
          html: `${customer?.firstName} has sent you a message on ${assignmentData.title}`,
        },
      })
    } else if (receiverId === customerId) {
      await addDoc(collection(db, 'mail'), {
        to: customer?.email,
        message: {
          subject: 'New Reply',
          html: `${student?.firstName} has sent you a message on ${assignmentData.title}`,
        },
      })
    }
    toast.success('Reply sent')
    setNewReply('')
  }
  return (
    <div>
      <div className="my-2">
        <button
          onClick={() => setRepliesVisible(!repliesVisible)}
          className="text-base font-medium text-blue-800"
        >
          {user && (user.userId === customerId || user.userId === studentId)
            ? 'Reply'
            : replies.length > 0 && 'See replies'}
        </button>
      </div>

      {repliesVisible && (
        <div className=" w-full rounded-xl bg-white px-3 py-1 md:px-8">
          <div className="mt-3">
            {replies.map((reply: any) => (
              <div key={reply.replyId} className="my-1.5">
                <div className="flex w-full flex-row items-start ">
                  <div className="flex flex-row">
                    <Image
                      src={reply.senderDetails.profilePicture}
                      alt="profile"
                      width={50}
                      height={50}
                      className="mr-1 h-[40px] w-[40px] rounded-full object-cover"
                    />
                  </div>
                  <div className="min-h-[60px] flex-1 rounded-md bg-gray-100 p-2 text-gray-800">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center space-x-4">
                        <span className="text-base text-blue-400">
                          {reply.senderDetails.firstName}
                        </span>
                        {reply.senderId === assignmentData.student.userId && (
                          <span className="flex items-center rounded-xl bg-gray-500 px-2 py-0.5 text-center text-[10px] font-medium uppercase text-gray-200">
                            Student
                          </span>
                        )}
                      </div>

                      <div className="text-xs">
                        {reply.timestamp && (
                          <span>
                            {new Date(
                              reply.timestamp?.toMillis()
                            ).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}{' '}
                            {new Date(
                              reply.timestamp?.toMillis()
                            ).toLocaleTimeString([], {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{reply.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {user && (user.userId === customerId || user.userId === studentId) && (
            <div className="mt-3">
              <form className=" mx-auto mb-2 flex  flex-row items-center rounded-xl border border-gray-400 ">
                <input
                  placeholder="Reply"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="mr-10 h-10 w-full rounded-xl  p-2 outline-none"
                />
                <div className=" mr-1 ">
                  <MdSend
                    size={20}
                    className="cursor-pointer"
                    onClick={sendReply}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
