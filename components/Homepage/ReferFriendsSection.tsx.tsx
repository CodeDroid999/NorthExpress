import Home from 'components/layout/HomeSection';
import CustomNavbar from 'components/layout/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import HeroBackground from "public/main_cover.jpg";
import React from 'react';

const ReferFriends = () => {
    return (
        <div className="pt-4 pb-4">
            <section className="slider_section2">
                <div className="container flex justify-center items-center h-full">
                    <div className="w-3/5 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900">
                            Get on-demand Q&A <span className="font-normal">Homework help</span> from verified tutors.
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl my-4">
                            Work with thousands of tutors to help you meet your deadlines and get the grades you so sorely need!
                        </p>
                        <div className="btn-box">
                            <Link href="/howitworks" className="btn-1 rounded bg-blue-500 text-white px-4 py-2 mx-2 hidden md:inline">Learn more</Link>
                            <Link href="" className="btn-2 rounded bg-green-900 text-white px-4 py-2 mx-2">Post Assignment     </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReferFriends;
