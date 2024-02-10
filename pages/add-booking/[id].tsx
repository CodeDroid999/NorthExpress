import React, { useEffect, useState } from 'react';
import { UserAuth } from 'context/AuthContext';
import Footer from 'components/layout/Footer';
import LoginModal from 'components/layout/LoginModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import HomeArea from 'components/layout/HomeSectionBluse';
import AddBookingForm from '../../components/Booking/AddBookingForm';
import TripsDisplay from 'components/Booking/ScheduleDisplay';

interface Query {
  [key: string]: string;
}

export default function Home(props) {

  const router = useRouter();
  const { userRole } = UserAuth(); // Access the userRole from the context
  const { user } = UserAuth(); // Access the user from the context
  const [showLoginModal, setShowLoginModal] = useState(false); // State variable to manage modal visibility

  const openModal = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    const redirectToRolePage = () => {
      if (userRole) {
        switch (userRole) {
          case 'Student':
            // Redirect Student to post-booking
            router.push('/dashboard');
            break;
          case 'Tutor':
            // Redirect Tutor to dashboard
            router.push('/dashboard');
            break;
          case 'Admin':
            // Redirect Admin to /admin/dashboard
            router.push('/admin/dashboard');
            break;
        }
      }
    };

    redirectToRolePage();
  }, [userRole, router]);

  return (
    <>
      <HomeArea />
      <AddBookingForm />
      <TripsDisplay travelDate="2024-02-10" />
      {/* Login Modal */}
      {!user ? (
        <>
          <LoginModal />
        </>
      ) : (
        <>
          {toast.success("Welcome Back!")}
        </>
      )}

      <Footer />
    </>
  );
}
