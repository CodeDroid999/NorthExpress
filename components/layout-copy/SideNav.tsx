import Link from 'next/link';
import React from 'react';

const SideNav = () => {
  return (
    <>
      <div className="p-2 flex font-bold items-center">
        <Link href="/help" className="text-blue-800 text-right whitespace-nowrap">Help</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/dashboard" className="text-blue-800 text-right whitespace-nowrap">Home</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/about" className="text-blue-800 text-right whitespace-nowrap">About</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/privacy" className="text-blue-800 text-right whitespace-nowrap">Privacy</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/terms" className="text-blue-800 text-right whitespace-nowrap">Terms</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/refund" className="text-blue-800 text-right whitespace-nowrap">Refund</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/refer-a-friend" className="text-blue-800 text-right whitespace-nowrap">Refer a Friend</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/blog" className="text-blue-800 text-right whitespace-nowrap">Blog</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/how-it-works" className="text-blue-800 text-right whitespace-nowrap">How It Works</Link>
      </div>
      <div className="p-2 flex font-bold items-center">
        <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Us</Link>
      </div>
    </ >
  );
};

export default SideNav;
