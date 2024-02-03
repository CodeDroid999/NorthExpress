import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Head from 'next/head';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { formatDate } from './profile/[id]';
import router from 'next/router';


const PAGE_SIZE = 10; // Number of assignments per page 


const BidAssignments: React.FC = (props: any) => {
  const { assignments, currentPage, totalPages } = props;
  const handleNavigation = (assignmentId: string) => {
    router.push(`/order/${assignmentId}`);
  };




  return (
    <>
      <Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>
      <Navbar />
      <div className="mt-20 h-screen overflow-hidden">
        <div className="border border-green-800 rounded-xl pb-3 h-80">
          <p className="bg-green-900 w-full p-3 text-white">Make Money by Helping with Homework</p>
          <div className="flex flex-col flex-grow w-full bg-white p-2 overflow-auto">
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
                {assignments.map((assignment, index) => (
                  <tr
                    key={assignment.id}
                    className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                    onClick={() => handleNavigation(assignment.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="pl-2 pt-1">{assignment.title}</td>
                    <td className="text-center">{assignment.dueDate}</td>
                    <td className="text-center">{assignment.status}</td>
                    <td className="text-center">{assignment.budget}</td>
                    <td className="text-center">{assignment.offers.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-800'
                  }`}
                onClick={() => router.push(`/?page=${index + 1}`)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BidAssignments;

export async function getServerSideProps(context) {
  try {
    const page = parseInt(context.query.page, 10) || 1;
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const q = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const totalAssignments = querySnapshot.docs.length;
    const totalPages = Math.ceil(totalAssignments / PAGE_SIZE);

    const assignments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        data.createdAt = formatDate(data.createdAt.toDate());
        const id = doc.id;

        // Check if userId is available directly in the assignment data
        if (data.userId) {
          const q = query(collection(db, 'users'), where('userId', '==', data.userId));
          const usersSnapshot = await getDocs(q);

          // Check if there is at least one user document
          if (usersSnapshot.docs.length > 0) {
            const studentDoc = usersSnapshot.docs[0];
            const studentData = studentDoc.data();
            studentData.createdAt = formatDate(studentData.createdAt.toDate());

            const offersCollectionRef = collection(db, 'assignments', id, 'offers');
            const offersQuerySnapshot = await getDocs(offersCollectionRef);

            const offers = offersQuerySnapshot.docs.map((offerDoc) => {
              const offerData = offerDoc.data();
              offerData.createdAt = formatDate(offerData.createdAt.toDate());
              return {
                offerId: offerDoc.id,
                ...offerData,
              };
            });

            return { id, ...data, offers, studentDetails: studentData };
          } else {
            console.error(`No user document found for userId: ${data.userId}`);
          }
        } else {
          console.error(`No userId field available for assignment with id: ${id}`);
        }

        return null; // Return null for assignments without proper user information
      })
    );

    // Filter out null values from the assignments array
    const validAssignments = assignments.filter((assignment) => assignment !== null);

    return {
      props: {
        assignments: validAssignments,
        currentPage: page,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        assignments: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
}


