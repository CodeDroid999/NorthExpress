import { auth, db } from '../../../firebase'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import profile from 'public/profile.jpeg'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import UserAbout from 'components/profile/Reviews/UserAbout'
import UserReviews from 'components/reviews/UserReviews'
import ReviewsTab from 'components/manage-account/Reviews/ReviewTab'
import Bio from 'components/manage-account/BioTab'
import SkillsAndEducation from 'components/manage-account/SkillsTab'
import PersonalInfoTab from 'components/manage-account/PersonalInfoTab'
import AssignmentsTab from 'components/manage-account/UserAssignmentsTab'
import Navbar from 'components/AdminLayout/Navbar'
import UserApplicationHistory from 'components/manage-account/ApplicationsTab'

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-us', { month: 'short' })
    const year = date.getFullYear()
    const suffix =
        day === 1 || day === 21 || day === 31
            ? 'st'
            : day === 2 || day === 22
                ? 'nd'
                : day === 3 || day === 23
                    ? 'rd'
                    : 'th'
    return `${day}${suffix} ${month} ${year}`
}

export default function ManageAccount() {
    const [assignments, setAssignments] = useState([])
    const [reviews, setReviews] = useState([])
    const [activeTab, setActiveTab] = useState('basic') // Default tab is 'Personal Info tab'
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const userId = router.query?.id
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (userId) {
            setLoading(true)

            // Fetch user data including role
            const q = query(collection(db, 'users'), where('userId', '==', userId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const userData = doc.data();
                    userData.createdAt = formatDate(userData.createdAt.toDate());
                    userData.UserId = doc.data().userId;

                    setUser(userData);
                    setUserRole(userData.role); // Set the user role

                    setLoading(false);
                } else {
                    setUser(null);
                    setUserRole(null);
                    setLoading(false);
                }
            });


            const assignmentsQuery = query(
                collection(db, 'users'),
                where('tutor.userId', '==', userId)
            )

            // Create a query for reviews
            const reviewsQuery = query(
                collection(db, 'reviews'),
                where('tutorId', '==', userId)
            )

            // Fetch assignments
            const assignmentsPromise = getDocs(assignmentsQuery).then((assignmentQuerySnapshot) => {
                const assignments = assignmentQuerySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    // Additional processing for assignment data if needed
                    return { id: doc.id, ...data }
                })
                return assignments
            })

            // Fetch reviews
            const reviewsPromise = getDocs(reviewsQuery)
                .then((reviewQuerySnapshot) => {
                    const reviews = reviewQuerySnapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                    return reviews
                })
                .then((reviews) => {
                    // Fetch sender data for each review
                    const senderPromises = reviews.map((review: any) =>
                        getDocs(
                            query(
                                collection(db, 'users'),
                                where('userId', '==', review.senderId)
                            )
                        ).then((senderSnapshot) => {
                            const senderData = senderSnapshot.docs[0].data()
                            return { ...review, reviewer: senderData }
                        })
                    )

                    return Promise.all(senderPromises)
                })

            // Wait for both promises to resolve
            Promise.all([assignmentsPromise, reviewsPromise])
                .then(([assignments, reviews]) => {
                    setAssignments(assignments)
                    setReviews(reviews)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                })

            return () => {
                unsubscribe()
            }
        }
    }, [userId])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/')
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    const completedAssignments = assignments.filter((assignment) => assignment.status === 'Completed')
    const myTutorReviews = reviews.filter(
        (review) => review.senderId !== review.tutorId
    )

    return (
        <div>
            <Navbar />
            {loading ? (
                <div className="flex h-screen items-center justify-center">
                    <div
                        className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
                        role="status"
                        aria-label="loading"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="min-w-100  min-h-screen  bg-gray-100">
                    <div className="bg-gray-100 mx-auto mt-20 min-h-screen max-w-[1000px]  px-3 pt-10 antialiased">
                        <div className="p-2 border-2">
                            <div className=" flex space-x-2">
                                <div className="">
                                    <Image
                                        src={user?.profilePicture || profile}
                                        alt="profile picture"
                                        height={100}
                                        width={100}
                                        className="h-[100px] w-[100px] rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center align-center items-center">
                                    <p className="text-2xl font-semibold text-green-950">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    {user?.createdAt && (
                                        <p className="text-sm font-medium text-green-950">
                                            Member since {user?.createdAt}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="container flex justify-center mt-2">
                                <div className="grid grid-cols-4 w-[1200px] gap-1">
                                    <div className="border shadow rounded py-1 px-1 text-center">Type: {userRole}</div>
                                    <div className="border shadow rounded py-1 px-1 text-center">Status: {user?.accountStatus}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 bg-gray-100 p-3">
                            {user?.aboutDescription && (
                                <div className="mb-2 w-full justify-center text-white">
                                    <p className="text-base font-medium text-gray-700">
                                        <UserAbout about={user?.aboutDescription} />
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-1">
                            <div className="my-1">
                                <div className="flex items-center justify-center">
                                    <div className="mx-3  mb-2 w-full justify-center rounded-lg bg-blue-100 text-white">
                                        <h3 className="p-3 text-lg text-gray-900 md:text-2xl lg:text-2xl">
                                            Stats
                                        </h3>
                                        {/* ... (user stats content) */}
                                        <div className="flex flex-wrap items-center  justify-center gap-2 p-5 pt-1">
                                            <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                                                <div className="p-4 md:p-7">
                                                    <h2 className="text-center text-xl capitalize text-gray-200">
                                                        {completedAssignments.length}
                                                    </h2>
                                                    <h3 className="text-center  text-sm  text-gray-400">
                                                        completed
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="w-42 h-42 flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                                                <div className="p-4 md:p-7">
                                                    <h2 className="text-center text-xl capitalize text-gray-200">
                                                        {assignments.length}
                                                    </h2>
                                                    <h3 className="text-center  text-sm  text-gray-400">
                                                        Homeworks Assigned
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="w-42 h-42  flex-auto rounded-lg  bg-gradient-to-r from-gray-800    to-gray-700    shadow-lg">
                                                <div className="p-4 md:p-7">
                                                    <h2 className="text-center text-lg capitalize text-gray-200">
                                                        {myTutorReviews.length}
                                                    </h2>
                                                    <h3 className="text-center  text-sm  text-gray-400">
                                                        Reviews
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5 flex items-center justify-between space-x-1 px-6">
                                    <button
                                        className={`${activeTab === 'basic' ? 'bg-gray-200' : ''
                                            } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                        onClick={() => handleTabClick('basic')}
                                    >
                                        Personal Info
                                    </button>
                                    <button
                                        className={`${activeTab === 'skills' ? 'bg-gray-100' : ''
                                            } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                        onClick={() => handleTabClick('skills')}
                                    >
                                        Skills & Education
                                    </button>
                                    <button
                                        className={`${activeTab === 'bio' ? 'bg-gray-100' : ''
                                            } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                        onClick={() => handleTabClick('bio')}
                                    >
                                        Bio
                                    </button>
                                    <button
                                        className={`${activeTab === 'reviews' ? 'bg-gray-100' : ''
                                            } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                        onClick={() => handleTabClick('reviews')}
                                    >
                                        Reviews
                                    </button>
                                    <>
                                        {user?.role === 'Tutor' && (
                                            <button
                                                className={`${activeTab === 'applications' ? 'bg-gray-100' : ''
                                                    } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                                onClick={() => handleTabClick('applications')}
                                            >
                                                Applications
                                            </button>
                                        )}

                                        {user?.role === 'Student' && (
                                            <button
                                                className={`${activeTab === 'assignments' ? 'bg-gray-100' : ''
                                                    } w-full whitespace-nowrap border-2 rounded hover:shadow-2xl py-3 text-center text-sm font-medium text-green-950 transition duration-150 ease-in hover:text-gray-900`}
                                                onClick={() => handleTabClick('assignments')}
                                            >
                                                Assignments
                                            </button>
                                        )}
                                    </>

                                </div>

                                {activeTab === 'basic' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Personal Info tab */}
                                        <PersonalInfoTab user={user} />
                                    </div>
                                )}

                                {activeTab === 'skills' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Skills & Education tab */}
                                        <SkillsAndEducation user={user} />
                                    </div>
                                )}

                                {activeTab === 'bio' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Languages tab */}
                                        <Bio user={user} />
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Reviews tab */}
                                        <ReviewsTab />
                                    </div>
                                )}
                                {activeTab === 'applications' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Personal Info tab */}
                                        <UserApplicationHistory />
                                    </div>
                                )}
                                {activeTab === 'assignments' && (
                                    <div className="w-full p-4">
                                        {/* Content for the Personal Info tab */}
                                        <AssignmentsTab />
                                    </div>
                                )}


                                {/* ... (other code) */}
                            </div>
                        </div>



                        <div>{user && <UserReviews userId={user?.userId} />}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
