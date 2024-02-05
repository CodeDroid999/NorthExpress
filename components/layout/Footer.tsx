/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer role="alert" className="bg-blue-950">
      <div id="mainFooter" className="theme-footer bg-blue-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div data-gutter="60" className="row row-eq-height row-mob-full">
            <div className="col-lg-4">
              <div className="theme-footer-section theme-footer-">
                <a href="#" className="theme-footer-brand block mt-5">
                  <div className="mb-1">
                    <span className="text-2xl text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold px-1 font-extrabold w-full border-2 rounded border-gray-100 hidden md:inline"> NorthExpress </span>
                    <span className="text-2xl text-blue-700 px-1 font-extrabold w-full border-2 rounded border-blue-700 inline md:hidden"> NE </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <h1 className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold text-2xl font-bold">Company</h1>
                {/* Add the rest of the content for the footer */}
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">About Us</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">Contact Us</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">Terms & Conditions</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">Privacy Policy</Link>
              </div>
            </div>
            <div className="col-md-2">
              <div className="row">
                <h1 className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold text-2xl font-bold">Contacts</h1>
                {/* Add the rest of the content for the footer */}
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">0726 354 300</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">0726 354 300</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">0726 354 300</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">0726 354 300</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">0726 354 300</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">bookings@northexpresskenya.com</Link>
                <Link href="/about-us" className="text-gray-100 hover:text-yellow-600 whitespace-nowrap font-bold ">support@northexpresskenya.com</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-copyright">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-6">
              <p className="theme-copyright-text">Copyright © 2022 <a href="/" className="text-white">NorthExpress</a>. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cookies-eu-banner hidden bg-gray-800 text-white">
        By using NorthExpress's services, you agree to our Cookies Use. We use cookies for analytics and personalisation.
        <button id="cookie-button" className="cookie-button">Close</button>
      </div>
    </footer >
  );
};

export default Footer;
