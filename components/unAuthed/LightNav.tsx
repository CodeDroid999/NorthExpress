import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import MobileNavbar from './MobileNav';
import logo from 'public/logo.png'



const LightCustomNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className="m-auto flex max-w-[1100px] items-center justify-between p-2 lg:p-3">
      {/**Mobile Nav */}
      <MobileNavbar/>

      {/**Desktop */}
      <div className="hidden w-full items-center justify-between font-semibold lg:flex">
        <div className="flex flex-row items-center">
          <div className="mr-1">
            <h1 className="text-4xl font-bold">
              <Link href="/" className="text-gray-700">
                <div className="mb-1">
                  <Image
                   src={logo}
                    alt="assignment"
                    width={200}
                    height={100}
                    className="h-[50px] w-[100%] md:h-[50px] lg:h-[60px] lg:w-[50px]"
                  />
                </div>
              </Link>
            </h1>
          </div>


        </div>

        {/* Right-side links */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="px-2 py-1 font-medium text-gray-700 hover:bg-gray-200"
          >
            HOME
          </Link>

          <Link
            href="/about"
            className="px-2 py-1 font-medium text-gray-700 hover:bg-gray-200"
          >
            ABOUT
          </Link>
          <Link
            href="/services"
            className=" px-2 py-1 font-medium text-gray-700 hover:bg-gray-200"
          >
            SERVICES
          </Link> <Link
            href="/projects"
            className="px-2 py-1 font-medium text-gray-700 hover:bg-gray-200"
          >
            PROJECTS          </Link> <Link
              href="/signup"
              className="px-2 py-1 font-medium text-gray-700 hover:bg-gray-200"
            >
            BLOG
          </Link>
          <Link
            href="/contact-us"
            className="px-2 py-1 font-medium text-gray-700  hover:text-blue-800 hover:bg-gray-200"
          >
            CONTACT US
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LightCustomNavbar;
