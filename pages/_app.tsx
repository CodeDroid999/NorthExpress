// Import CSS styles
import '../styles/bootstrap.css';
import '../styles/custom.css';
import '../styles/customed.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/responsive.css';
import '../styles/sidenavigation.css';
import '../styles/style.css';
import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import { AuthContextProvider, UserAuth } from 'context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import LoginModal from 'components/layout/LoginModal';
import { useRouter } from 'next/router';

export interface SharedPageProps {
  token: string;
}

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { user } = UserAuth();
  const router = useRouter();



  return (
    <>
      <AuthContextProvider>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
