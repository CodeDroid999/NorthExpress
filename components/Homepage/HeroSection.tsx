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
                                                Comfortable<span className="text-green-900">Efficient</span>Affordable .
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

                    </div >

                </div >
            </section >
        </div >
    );
};

export default HeroArea;
