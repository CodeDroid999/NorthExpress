import Home from 'components/unAuthed/HomeSection';
import CustomNavbar from 'components/unAuthed/Navbar';
import Image from 'next/image'
import Link from 'next/link';
import HeroBackground from "public/hero-bg.jpeg"
import React from 'react';

const HeroArea = () => {
  return (
    <div className="hero_area">
      <div className="hero_bg_box">
        <div className="img-box">
          <Image
            src={HeroBackground}
            alt="assignment"

            className="w-full h-full"
          />
        </div>
      </div>
      <div className="relative h-[100vh] pb-6 top-0 left-0">
        <Home />
        {/* Gradient Cover */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end justify-center text-white pb-3">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-200">
              Earn <span className="text-gray-200">money</span>
            </h1>
            <h1 className="text-4xl font-bold mb-4">answering homework questions</h1>
            <p className="text-lg mb-6">
              Earn up to <strong>$7,500 USD </strong>monthly working from home tutoring students!
            </p>
            <div className="btn-box whitespace-nowrap">
              <Link className="btn-1 py-2 px-3 text-xl rounded bg-green-900 text-white" href="tutor-application">Apply now!</Link>
            </div>
            <p className="text-lg mt-4 text-yellow-600 pb-4">Now accepting tutors from all over the world!</p>
          </div>
        </div>


      </div>
    </div >
  );
};

export default HeroArea;
