/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'
import { UserAuth } from 'context/AuthContext'

export default function Layout({ children }) {
  const accountStatus = UserAuth().toString();

  return (
    <div>
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
      <div className="mx-auto w-full">
        {accountStatus === 'Active' && (
          <main className="mt-20 lg:mt-24">{children}</main>
        )}
        {accountStatus === 'inActive' && (
          <main className="mt-20 lg:mt-24"><p>Our Admins are reviewing your account before you can proceed. Complete your profile meanwhile!</p></main>
        )}
        {accountStatus === 'suspended' && (
          <main className="mt-20 lg:mt-24"><p>Your Account has been suspended!</p></main>
        )}
      </div>
      <Footer />
    </div>
  )
}
