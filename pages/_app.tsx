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
import { lazy, useEffect } from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import { Toaster } from 'react-hot-toast'

import '../styles/custom.css'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps

 
  return (
    <>
      <AuthContextProvider>
        <Toaster position="bottom-center" />
        {draftMode ? (
          <PreviewProvider token={token}>
            <Component {...pageProps} />
          </PreviewProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContextProvider>
    </>
  )
}
