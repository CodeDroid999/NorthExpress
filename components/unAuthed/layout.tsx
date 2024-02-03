/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import React from 'react'

import Footer from './Footer'
import CustomNavbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>
          QualityunitedWriters | Get More Done | Post any assignment. Pick the best person. Get it
          done. | Post your assignment for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon/favicon-32x32.png"
        />
        <meta
          name="description"
          content="Post your assignment for free | Earn money as a tutor| Discover how QualityunitedWriters works | Trusted ratings and reviews| Insurance for peace of mind | Join QualityunitedWriters today!"
        />

      </Head>
      <header id="home" className="header_section">
        <div className="header_bottom">
          <CustomNavbar />
        </div>
      </header>
      <main className="mt-2 lg:mt-24">{children}</main>
      <Footer />
    </div>
  )
}
