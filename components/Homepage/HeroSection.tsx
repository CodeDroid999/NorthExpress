import Home from 'components/unAuthed/HomeSection';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';

const HeroArea = () => {
    return (
        <div className="hero_area">
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
            <Home />
            <section className=" slider_section ">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Get on-demand Q&A<span className="text-green-900"> Homework help</span> from verified tutors.
                                            </h1>
                                            <p className="pt-1 pb-2 text-lg">
                                                Work with thousands of tutors to help you meet your deadlines and get the grades you so sorely need!
                                            </p>
                                            <div className="btn-box whitespace-nowrap">
                                                <Link href="/howitworks" className="btn-1 rounded"> Learn more </Link>
                                                <Link href="" className="btn-2 rounded">Post Assignment     </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Apply for an account to start working online.
                                                <span className="text-green-900">
                                                    Tutor Online </span>
                                            </h1>
                                            <p className="pt-1 pb-2 text-lg">Every 15 assigned tutoring, get 10% cash back (Limited to $50) on your posted assignments!</p>
                                            <div className="btn-box whitespace-nowrap">
                                                <Link href="/howitworks" className="btn-1 rounded"> Learn more </Link>
                                                <Link href="" className="btn-2 rounded">Become a tutor</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                APA examples/ samples<span className="text-green-900"> creative vision </span>
                                            </h1>
                                            <p className="pt-1 pb-2 text-lg">
                                                Collaborate to bring your ideas to life with precision, creativity, and innovation. We are your
                                                creative partner. </p>
                                            <div className="btn-box">
                                                <Link href="#about" className="btn-1"> Learn more </Link>
                                                <Link href="#contact" className="btn-2">Get A Quote</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="container idicator_container">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div >
            </section >
        </div >
    );
};

export default HeroArea;
