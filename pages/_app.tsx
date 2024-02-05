// Import CSS styles
import '../styles/bootstrap.css';
import '../styles/custom.css';
import '../styles/customed.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/responsive.css';
import '../styles/sidenavigation.css';
import '../styles/style.css';
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { lazy, useEffect, useState } from 'react'
import { AuthContextProvider, UserAuth } from 'context/AuthContext'
import { Toaster } from 'react-hot-toast'

import '../styles/custom.css'
import LoginModal from 'components/unAuthed/LoginModal';

export interface SharedPageProps {
  token: string
}


export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { token } = pageProps;
  const { user } = UserAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!user) {
      // Show login modal if the user is not logged in
      setShowLoginModal(true);
    }
  }, [user]);

  return (
    <>
      <AuthContextProvider>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
        {/* Login Modal */}
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      </AuthContextProvider >
    </>
  )
}
