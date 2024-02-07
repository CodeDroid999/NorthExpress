import Link from 'next/link';
import React from 'react';

const NavigationMenu: React.FC = () => {
  return (
    <div className=" w-100">
      <ul className="navbar-nav p-1 bg-blue-100">
        <li className="nav-item active p-2 ">
          <Link href="/" passHref>
            <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2 text-white fint-bold">Home <span className="sr-only">(current)</span></span>
          </Link>
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/how-it-works" passHref>
            <span className="nav-link  pl-3 pt-2 pr-2 pb-2 mb-2">How it works</span>
          </Link>
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/login" passHref>
            <span className="nav-link pl-3">Sign in</span>
          </Link>
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/signup" passHref>
            <span className="nav-link pl-3">Sign up +</span>
          </Link>
        </li>
        <li className="nav-item shadow bg-gray-300 ">
          <Link href="/blog" passHref>
            <span className="nav-link pl-3">Blog</span>
          </Link>
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
