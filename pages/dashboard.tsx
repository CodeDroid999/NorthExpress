import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import PostYourTask from 'components/home/PostYourTask'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import { UserAuth } from 'context/AuthContext'



interface PageProps extends SharedPageProps {
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
import HowItWorksSection from 'components/howitworks/HowITWorksSection'

const Dashboard: React.FC = (props: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { bookings } = props;
  const { user } = UserAuth();
  const userRole = user?.role;
  const handleNavigation = (assignmentId: string) => {
    router.push(`/order/${assignmentId}`);
  };


  return (
    <>
      <Head>
        <title>
          NorthExpress | Get More Done | Post any booking. Pick the best person. Get it done. | Post your booking for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
        />
        <meta name="keywords" content="NorthExpress, bookings, tutor, earn money, post booking" />
        <meta name="author" content="NorthExpress" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="NorthExpress | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
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
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    const bookings = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        data.createdAt = formatDate(data.createdAt.toDate());
        const id = doc.id;

        // Check if userId is available directly in the booking data
        if (data.userId) {
          const q = query(collection(db, 'users'), where('userId', '==', data.userId));
          const usersSnapshot = await getDocs(q);

          // Check if there is at least one user document
          if (usersSnapshot.docs.length > 0) {
            const studentDoc = usersSnapshot.docs[0];
            const studentData = studentDoc.data();
            studentData.createdAt = formatDate(studentData.createdAt.toDate());

            const offersCollectionRef = collection(db, 'bookings', id, 'offers');
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
          console.error(`No userId field available for booking with id: ${id}`);
        }

        return null; // Return null for bookings without proper user information
      })
    );

    // Filter out null values from the bookings array
    const validAssignments = bookings.filter((booking) => booking !== null);

    return {
      props: {
        bookings: validAssignments,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    return {
      props: {
        bookings: [],
      },
    };
  }
}
