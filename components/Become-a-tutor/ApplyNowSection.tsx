import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const AppplyNowHero = () => {
  return (
    <div className="relative h-[40vh] pb-6">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://i.postimg.cc/ZY1LfZ2p/town.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Gradient Cover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end justify-center text-white pb-3">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-200">
            Travel your dream destination
          </h1>
          <h1 className="text-4xl font-bold mb-4">Comfortable. Efficient. Affordable.</h1>
          <p className="text-lg mb-6">
            At <strong className="text-yellow-600 font-bold">North Express</strong>, we are redefining<strong className="text-yellow-600 font-bold"> comfort</strong>, and setting new standards of<strong className="text-yellow-600 font-bold"> efficiency </strong>and<strong className="text-yellow-600 font-bold">reliability</strong> .
          </p>

        </div>
      </div>

      {/* Include Home component if needed */}
    </div >
  );
};

export default AppplyNowHero;
