import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const DiscoverDestinations = () => {
    return (
        <div className="relative h-[45vh] pb-6">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="https://i.postimg.cc/nzkhXqgp/rongrende.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Gradient Cover */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end justify-center text-white pb-3">
                <div className="text-left">
                    <h1 className="text-4xl font-bold mb-4 text-gray-200">
                        Explore &   Discover
                    </h1>
                    <h1 className="text-4xl font-bold mb-4">25+ Destinations</h1>
                    <p className="text-lg mb-6">
                        “Man cannot discover new oceans unless he has the courage to lose sight of the shore.”
                        <br />
                        <strong className="text-yellow-600 font-bold">― Andre Gide</strong>
                    </p>

                </div>
            </div>

            {/* Include Home component if needed */}
        </div >
    );
};

export default DiscoverDestinations;
