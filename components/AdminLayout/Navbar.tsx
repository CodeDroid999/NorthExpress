import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserAuth } from 'context/AuthContext'
import Image from 'next/image'
import airtaskalogo from 'public/QualityUnitedWritersLogo.png'
import Avatar from './Avatar'
import Avartar from './Avartar'
import RedDot from 'components/messaging/RedDot'
import { db } from '../../firebase'
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import Dropdown from './DropDown'

type Notification = {
  id: string
  content: string
  createdAt: any // Use the appropriate type for timestamp
  read: boolean
  receiverId: string
  senderId: string
  assignmentId: string
  assignmentTitle: string
  type: string
}

function Navbar() {
  const [nav, setNav] = useState(false)
  const { user, logOut } = UserAuth()
  const userId = user?.userId

  {
    /**Handle RedDOt */
  }
  const [unReadNotifications, setUnreadNotifications] = useState([])
  const [unReadMessages, setUnreadMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const userRole = user?.role

  useEffect(() => {
    if (userId) {
      setLoading(true)
      const notificationsRef = collection(db, 'notifications')

      // Fetch user's notifications
      const notificationsQuery = query(
        notificationsRef,
        where('receiverId', '==', userId)
      )

      const unsubscribe = onSnapshot(
        notificationsQuery,
        async (querySnapshot) => {
          const notificationsData = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              }
            })
          )

          // Mark unread notifications as read
          const unread = notificationsData.filter(
            (notification: any) => notification.read === false
          )

          setUnreadNotifications(unread)

          setLoading(false)
        }
      )

      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      setLoading(true)

      // Fetch chats where the user is a participant
      const chatsRef = collection(db, 'chats')
      const chatsQuery = query(
        chatsRef,
        where('participants', 'array-contains', userId)
      )

      const unsubscribe = onSnapshot(chatsQuery, async (querySnapshot) => {
        const chatIds = querySnapshot.docs.map((doc) => doc.id)

        const allMessagesPromises = chatIds.map(async (chatId) => {
          const messagesRef = collection(db, 'chats', chatId, 'messages')
          const messagesSnapshot = await getDocs(messagesRef)
          const messages = messagesSnapshot.docs.map((doc) => {
            return {
              chatId: chatId,
              messageId: doc.id,
              ...doc.data(),
            }
          })

          return messages
        })

        const allMessages = await Promise.all(allMessagesPromises)
        const flattenedMessages = allMessages.flat()
        const unread = flattenedMessages.filter(
          (message: any) =>
            message.receiverId === userId && message.read === false
        )

        setUnreadMessages(unread)

        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  {
    /**handle Navigation */
  }
  const handleNav = () => {
    setNav(!nav)
  }
  {
    /**Handle Logout */
  }
  const handleLogOut = () => {
    logOut()
  }

  return (
    <div className="fixed left-0 top-0 z-20 w-full  border border-x-transparent bg-white duration-300 ease-in">
      <div className="m-auto flex  items-center justify-between p-2 lg:p-3">
        {/**Mobile Nav */}
        <div className=" flex items-center justify-between  lg:hidden w-100">
          {/* Left div */}
          <div className="flex flex-row items-center space-x-1">
            <Link href="/" className="text-gray-700">
              <div className="ml-2">
                <Image
                  src={airtaskalogo}
                  alt="booking"
                  className="h-[40px] w-[100%] md:h-[50px] lg:h-[60px] lg:w-[50px]"
                  id="customfontsize"
                />
              </div>
            </Link>

          </div>

          {/*buffer div*/}

          {/* Right div */}
          <div className="flex justify-end lg:hidden">
            {!user ? (
              <div className="flex flex-row items-center space-x-5 mr-4 bg-gray-100 py-2 rounded">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-green-500"
                >
                  Log In
                </Link>

              </div>
            ) : (
              <div className="flex flex-row items-center space-x-1">


                <div className="flex flex-row items-center space-x-5 mr-4 bg-gray-100 py-2 rounded">
                  <Link
                    href="/admin/dashboard"
                    className="text-blue-800 hover:text-green-500 px-2"
                  >
                    Dashboard
                  </Link>

                </div>
                <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                  <Link
                    href={`/notifications/${user.userId}`}
                    className="text-gray-700 hover:text-green-500"
                  >
                    <Image
                      src="https://i.postimg.cc/Z5RLK0WK/notification-bell.png"
                      alt="booking" width="200" height="200"
                      className="h-[25px] w-[100%]"
                      id="customfontsize"
                    />
                  </Link>
                  {unReadNotifications.length > 0 && <RedDot />}
                </div>
                <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                  <Link
                    href={`/messages/${user.userId}`}
                    className="text-gray-700 hover:text-green-500"
                  >
                    <Image
                      src="https://i.postimg.cc/0NGGVS3n/messages-icon.png"
                      alt="booking" width="200" height="200"
                      className="h-[25px] w-[100%]"
                      id="customfontsize"
                    />
                  </Link>
                  {unReadMessages.length > 0 && <RedDot />}
                </div>
                <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                  <Link href={`/alerts/${user.userId}`} className="text-gray-700 hover:text-green-500">
                    <Image
                      src="https://i.postimg.cc/25LMy016/alert-icon-removebg-preview.png"
                      alt="booking" width="200" height="200"
                      className="h-[25px] w-[100%]"
                      id="customfontsize"
                    />

                  </Link>
                </div>
                <div className="flex flex-row align-center justify-center bg-gray-100 p-1 rounded-3xl">
                  <div className="font-bold px-2 pt-1 text-center text-blue-800">
                    Admin
                  </div>
                  <Avartar />
                </div>
              </div>
            )}
          </div>
        </div>

        {/**Desktop */}
        <div className="hidden w-full items-center justify-between font-semibold lg:flex">
          <div className="flex flex-row items-center">
            <div className="mr-10">
              <h1 className="text-4xl font-bold">
                <Link href="/" className="text-gray-700">
                  <div className="mb-1">
                    <Image
                      src={airtaskalogo}
                      alt="booking"
                      className="h-[50px] w-[100%] md:h-[50px] lg:h-[60px] lg:w-[50px] "
                    />
                  </div>
                </Link>
              </h1>
            </div>
          </div>

          {!user ? (
            <div className="flex flex-row items-center space-x-5 mr-4 bg-gray-100 py-2 rounded">
              <Link
                href="/login"
                className="text-gray-700 hover:text-green-500"
              >
                Log In
              </Link>

            </div>
          ) : (
            <div className="flex flex-row items-center space-x-1">


              <div className="flex flex-row items-center space-x-5 mr-4 bg-gray-100 py-2 rounded">
                <Link
                  href="/admin/dashboard"
                  className="text-blue-800 hover:text-green-500 px-2"
                >
                  Dashboard
                </Link>

              </div>
              <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                <Link
                  href={`/notifications/${user.userId}`}
                  className="text-gray-700 hover:text-green-500"
                >
                  <Image
                    src="https://i.postimg.cc/Z5RLK0WK/notification-bell.png"
                    alt="booking" width="200" height="200"
                    className="h-[25px] w-[100%]"
                    id="customfontsize"
                  />
                </Link>
                {unReadNotifications.length > 0 && <RedDot />}
              </div>
              <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                <Link
                  href={`/messages/${user.userId}`}
                  className="text-gray-700 hover:text-green-500"
                >
                  <Image
                    src="https://i.postimg.cc/0NGGVS3n/messages-icon.png"
                    alt="booking" width="200" height="200"
                    className="h-[25px] w-[100%]"
                    id="customfontsize"
                  />
                </Link>
                {unReadMessages.length > 0 && <RedDot />}
              </div>
              <div className="flex flex-row hover:bg-gray-100 p-1 rounded">
                <Link href={`/alerts/${user.userId}`} className="text-gray-700 hover:text-green-500">
                  <Image
                    src="https://i.postimg.cc/25LMy016/alert-icon-removebg-preview.png"
                    alt="booking" width="200" height="200"
                    className="h-[25px] w-[100%]"
                    id="customfontsize"
                  />

                </Link>
              </div>
              <div className="flex flex-row align-center justify-center bg-gray-100 p-1 rounded-3xl">
                <div className="font-bold px-2 pt-1 text-center text-blue-800">
                  Admin
                </div>
                <Avartar />
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default Navbar
