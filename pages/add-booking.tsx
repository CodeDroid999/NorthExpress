import FAQAccordion from 'components/FAQaccordions'
import Head from 'next/head'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Footer from 'components/layout/Footer'
import { UserAuth } from 'context/AuthContext'
import Alert from 'components/unAuthed/Alert'


interface Query {
  [key: string]: string
}

export default function Home(props) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const router = useRouter();
  const { userRole } = UserAuth(); // Access the userRole from the context

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
        <meta name="og:image" property="og:image" content="public/QualityUnitedWritersLogo.png" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>
      <div className="">
        <Alert />
      </div>
      <div className="header_bottom sticky bg-blue-600">
        <CustomNavbar />
      </div>
      <FAQAccordion />
      <Footer />
    </>
  )
}

