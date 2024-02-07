import { UserAuth } from 'context/AuthContext';
import Link from 'next/link';
import React from 'react';

const NavigationMenu: React.FC = () => {
  const user = UserAuth();
  return (
    <div className="absolute w-100">
      <ul className="navbar-nav p-1 bg-blue-100">
        <li className="nav-item active p-2 ">
          <Link href="/" passHref>
            <span className="nav-link  pl-3  pr-2  text-blue-950 font-bold ">Home <span className="sr-only">(current)</span></span>
          </Link>
        </li>

        <li className="nav-item shadow bg-gray-300 ">
          {!user ? (
            <Link href="/signup" passHref>
              <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">Sign Up</span>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">Sign In</span>
            </Link>
          )}
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/add-booking" passHref>
            <span className="nav-link pl-3">Book a ticket</span>
          </Link>
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/add-hire" passHref>
            <span className="nav-link pl-3">Hire a bus +</span>
          </Link>
        </li>

        <li className="nav-item shadow bg-gray-300 ">
          {!user ? (
            <Link href="/signup" passHref>
              <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">About Us</span>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">Sign In</span>
            </Link>
          )}
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/contact-us" passHref>
            <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">Contact us</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
