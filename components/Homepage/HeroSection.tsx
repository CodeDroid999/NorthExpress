/* eslint-disable react/no-unescaped-entities */
import Alert from 'components/unAuthed/Alert';
import Home from 'components/unAuthed/HomeSection';
import CustomNavbar from 'components/unAuthed/Navbar';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import PostYourBooking from './PostYourBooking';

const HeroArea = () => {
    return (
        <div className="hero_area " style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.607), rgba(0, 0, 0, 0.055))' }}>
            <div className="hero_bg_box">
                <div className="img-box">
                    <Image
                        src="https://i.postimg.cc/zDKqLqyb/hero-bg.jpg"
                        alt="assignment"
                        width="1400"
                        height="800"
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="">
                <Alert />
            </div>
            <div className="header_bottom sticky">
                <CustomNavbar />
            </div>

        </div >
    );
};

export default HeroArea;
