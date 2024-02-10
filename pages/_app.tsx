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
import toast, { Toaster } from 'react-hot-toast'

import '../styles/custom.css'
import LoginModal from 'components/layout/LoginModal';

export interface SharedPageProps {
  token: string
}


export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { user } = UserAuth();


  return (
    <>
      <AuthContextProvider>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
        {/* Login Modal */}
        {!user ? (
          <LoginModal />
        ) : (
          toast.success("Welcome Back!")
        )};
      </AuthContextProvider >
    </>
  )
}
