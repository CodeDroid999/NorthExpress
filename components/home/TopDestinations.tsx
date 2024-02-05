import React from 'react';

const TopDestinations: React.FC = () => {
    return (
        <section className="destination-area py-16 pb-20">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Top Destinations</h2>
                </div>
                <div className="flex flex-wrap mt-12 -mx-4">
                    {/* Destination Card */}
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="relative">
                                <img src="https://i.postimg.cc/XY1n921H/pexels-maxime-francis-2246476.jpg" alt="destination-img" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Nakuru</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Eldoret to Nakuru</h3>
                            </div>
                        </div>
                    </div>
                    {/* Destination Card */}
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="relative">
                                <img src="https://i.postimg.cc/XqPWSXMf/marsabit.jpg" alt="destination-img" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Marsabit</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Eldoret to Marsabit</h3>
                            </div>
                        </div>
                    </div>
                    {/* Destination Card */}
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="relative">
                                <img src="bg/heroBackground.jpeg" alt="destination-img" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Kitale</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Eldoret to Kitale</h3>
                            </div>
                        </div>
                    </div>
                    {/* Destination Card */}
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="relative">
                                <img src="https://i.postimg.cc/XJMxhbDr/mombasa.jpg" alt="destination-img" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Mombasa</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Eldoret to Mombasa</h3>
                            </div>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other destinations */}
                </div>
            </div>
        </section>
    );
};

export default TopDestinations;
