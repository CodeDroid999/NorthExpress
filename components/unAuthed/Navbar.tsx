import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

import MobileNavbar from './MobileNav';
import logo from 'public/sync-my-socials-logo.png'
import AccountDropdown from './AccountDropdown';


const CustomNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className="m-auto flex max-w-[1100px] items-center justify-between p-2 lg:p-3 ">
      {/**Mobile Nav */}
      <MobileNavbar />

      {/**Desktop */}
      <div className="flex flex-grow  w-full  justify-between font-semibold lg:flex">
        <div className="flex flex-row items-center">
          <div className="mr-1">
            <h1 className="text-4xl font-bold">
              <Link href="/" className="text-gray-700">
                <div className="mb-1">
                  <Image
                    src={logo}
                    alt="assignment"
                    className="h-[150px] w-[100%] md:h-[150px] lg:h-[60px] lg:w-[50px]"
                  />
                </div>
              </Link>
            </h1>
          </div>


        </div>

        {/* Right-side links */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="font-medium text-white hover:text-green-500"
          >
            Home
          </Link>

          <Link
            href="/bus-hire"
            className="font-medium text-white hover:text-green-500"
          >
            Bus Hire
          </Link>
          <Link
            href="/parcels"
            className="font-medium text-white hover:text-green-500"
          >
            Parcels
          </Link>
          <AccountDropdown />

        </div>
      </div>

    </div>
  );
};

export default CustomNavbar;
