import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Head from 'next/head';
import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { formatDate } from 'pages/public-profile/[id]';

const BidAssignmentsTable: React.FC = (props: any) => {
    const { bookings } = props;
    const handleNavigation = (assignmentId: string) => {
        router.push(`/order/${assignmentId}`);
    };




    return (
        <>
            <Head>
                <title>
                    NorthExpress - Travel with comfort.
                    Comfortable. Efficient. Affordable.
                    North Express is the brainchild of a group of veteran logisticians redefining luxury transport. At North Express, we are redefining comfort, and setting new standards of efficiency and reliability.
                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
                <meta name="author" content="NorthExpress" />
                <meta name="robots" content="index, follow" />
                <meta name="og:title" property="og:title" content="NorthExpress - Travel with comfort.
Comfortable. Efficient. Affordable.
North Express is the brainchild of a group of veteran logisticians redefining luxury transport. At North Express, we are redefining comfort, and setting new standards of efficiency and reliability." />
                <meta
                    name="og:description"
                    property="og:description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

                <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
            </Head>
            <Navbar />
            <div className="mt-20 ">
                <div className="border border-green-800 rounded-xl pb-3">
                    <p className="bg-green-900 w-full p-3 text-white">Make Money by Helping with Homework</p>
                    <div className="flex flex-col flex-grow w-full bg-white p-2">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="">Title</th>
                                    <th className="text-center">Due Date</th>
                                    <th className="text-center">Bidding</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Bids</th>
                                </tr>
                            </thead>
                            <tbody className="pt-2 pb-2">
                                {bookings.map((booking, index) => (
                                    <tr
                                        key={booking.id}
                                        className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                        onClick={() => handleNavigation(booking.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="pl-2 pt-1">{booking.title}</td>
                                        <td className="text-center">{booking.dueDate}</td>
                                        <td className="text-center">{booking.status}</td>
                                        <td className="text-center">{booking.budget}</td>
                                        <td className="text-center">{booking.offers.length}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BidAssignmentsTable;

export async function getServerSideProps() {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)

    const bookings = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
            const data = doc.data()
            data.createdAt = formatDate(data.createdAt.toDate())
            const id = doc.id

            const q = query(
                collection(db, 'users'),
                where('userId', '==', data.student.userId)
            )

            const usersSnapshot = await getDocs(q)

            const studentDoc = usersSnapshot.docs[0]
            const studentData = studentDoc.data()
            studentData.createdAt = formatDate(studentData.createdAt.toDate())

            const offersCollectionRef = collection(db, 'bookings', id, 'offers')
            const offersQuerySnapshot = await getDocs(offersCollectionRef)

            const offers = offersQuerySnapshot.docs.map((offerDoc) => {
                const offerData = offerDoc.data()
                offerData.createdAt = formatDate(offerData.createdAt.toDate())
                return {
                    offerId: offerDoc.id,
                    ...offerData,
                };
            });

            return { id, ...data, offers, studentDetails: studentData }
        })
    )

    return {
        props: {
            bookings,
        },
    }
}
