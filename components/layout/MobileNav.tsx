import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import NavigationMenu from './NavMenu';
import logo from 'public/sync-my-socials-logo.png'
import Avatar from 'components/layout/Avatar';
import MobileAvatar from 'components/layout/MobileAvatar';


const MobileNavbar = () => {
  // State variable to track the visibility of the menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="min-w-full items-center justify-between lg:hidden">
      <div className="flex min-w-full items-center justify-between">
        {/* Left div */}
        <div className="flex flex-row items-center space-x-1">
          <Link href="/" className="text-gray-700">
            <div className="mb-1">
              <Image
                src={logo}
                alt="booking"
                width={130}
                height={60}
                className="h-[60px] w-[100%]"
                id="customfontsize"
              />
            </div>
          </Link>
        </div>

        {/* Right div (Sticky bar) */}
        <div className="flex items-center justify-end mr-3">
          <div className="flex flex-col items-center "
            onClick={toggleMenu} >

            <MobileAvatar />
          </div>
        </div>
      </div>

      {/* Conditional rendering of the NavigationMenu based on isMenuVisible */}
      {isMenuVisible && (
        <div className="flex">
          <NavigationMenu />
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
