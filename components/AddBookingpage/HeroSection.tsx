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
            <section className=" slider_section ">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row mx-4">
                                    <div className="col-md-7">
                                        <h4 className="mb-4.5 text-lg font-medium text-white">
                                            🔥 North Express - Travel with comfort.
                                        </h4>
                                        <h1 className="mb-2 pr-16 text-3xl font-bold text-white xl:text-hero ">
                                            Comfortable.<span>Efficient.</span>Affordable.
                                        </h1>
                                        <div className="detail-box">
                                            <p className="text-white pt-1/2 pb-1/2 text-lg">
                                                North Express is the brainchild of a group
                                                of veteran logisticians redefining luxury transport.
                                                At North Express, we are redefining comfort, and setting new standards of efficiency and reliability.
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >

                </div >
                <PostYourBooking />
            </section >
        </div >
    );
};

export default HeroArea;