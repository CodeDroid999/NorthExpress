import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import PostYourTask from 'components/home/PostYourTask'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import { UserAuth } from 'context/AuthContext'



interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}


import React, { } from 'react';
import Navbar from '../components/layout/Navbar';
import Head from 'next/head';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { formatDate } from './profile/[id]';
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Footer from 'components/layout/Footer'
import PostAssignment from 'components/Homepage/PostAssignment'
import HowItWorksSection from 'components/Homepage/HowITWorksSection'

const Dashboard: React.FC = (props: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { assignments } = props;
  const { user } = UserAuth();
  const userRole = user?.role;
  const handleNavigation = (assignmentId: string) => {
    router.push(`/order/${assignmentId}`);
  };


  return (
    <>
      <Head>
        <title>
          QualityunitedWriters | Get More Done | Post any assignment. Pick the best person. Get it done. | Post your assignment for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="keywords" content="QualityunitedWriters, assignments, tutor, earn money, post assignment" />
        <meta name="author" content="QualityunitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityunitedWriters | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

        <meta name="og:url" property="og:url" content="https://www.QualityUnited Writers.com" />
      </Head>
      <Navbar />
      <div className="mx-auto w-full">
        {userRole === 'Student' && (
          <>
            <PostAssignment />
            <PostYourTask />
            <HowItWorksSection />
          </>

        )}

        {userRole === 'Tutor' && (
          <>
            <div className="mx-auto w-full">
              {userRole === 'Tutor' && (
                <>
                  <div className="mt-20 h-screen overflow-hidden">
                    <div className="border border-green-800 rounded-xl pb-3 h-80">
                      <p className="bg-green-700 w-full p-3 text-white">Make Money by Helping with Homework</p>
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
                    </div>
                  </div>


                  <BeYourOwnBoss />
                </>
              )}
            </div>
          </>

        )}
      </div>


      <FAQAccordion />
      <Footer />
    </>

  );
};

export default Dashboard;


export async function getServerSideProps() {
  try {
    const q = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

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
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        assignments: [],
      },
    };
  }
}
