import FAQAccordion from 'components/FAQaccordions';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { UserAuth } from 'context/AuthContext';
import Alert from 'components/layout/Alert';
import CustomNavbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import LoginModal from 'components/layout/LoginModal';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/router';

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

      <div className="">
        <Alert />
      </div>
      <div className="header_bottom sticky bg-blue-600">
        <CustomNavbar />
      </div>
      <FAQAccordion />
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
