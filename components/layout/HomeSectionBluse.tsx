/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Alert from './Alert';
import CustomNavbar from './Navbar';
import Image from 'next/image';
import PostYourBooking from 'components/Homepage/PostYourBooking';

const HomeArea: React.FC = () => {
    return (
        <header id="home" className="header_section pb-4">
            <div className="hero_bg_box">
                <div className="img-box">
                    <Image
                        src="https://i.postimg.cc/156hSWwZ/sewan.png"
                        width={1440}
                        height={600}
                        alt=""
                    />
                </div>
            </div>
            <div className="">
                <Alert />
            </div>
            <CustomNavbar />
        </header>
    );
};

export default HomeArea;
