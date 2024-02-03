import React from 'react';
import CustomNavbar from 'components/unAuthed/Navbar';
import SideNav from 'components/layout/SideNav';
import Footer from 'components/unAuthed/Footer';
import Steps from 'components/howitworks/Steps';

const About: React.FC = () => {
    return (
        <>
            <CustomNavbar />
            <div className="row flex pt-12">
                <div className="container flex">
                    <div className="col-md-2 mx-auto">
                        <SideNav />
                    </div>
                    <div className="col-md-10 mx-auto h-full pl-5">
                        <h1 className="text-blue-800 text-xl">About Us</h1>

                        <p className="pt-1 pb-2 text-lg">
                            Welcome to QualityUnitedWriters, where academic excellence meets professional writing services.
                        </p>

                        <h2 className="text-orange-400 font-semibold">Our Mission</h2>

                        <p className="pt-1 pb-2 text-lg">
                            At QualityUnitedWriters, our mission is to empower students on their educational journey by providing high-quality writing assistance.
                        </p>

                        <h2 className="text-orange-400 font-semibold">Who We Are</h2>

                        <p className="pt-1 pb-2 text-lg">
                            We are a team of dedicated writers and professionals committed to helping students succeed in their academic endeavors.
                        </p>

                        <h2 className="text-orange-400 font-semibold">Why Choose Us?</h2>

                        <p className="pt-1 pb-2 text-lg">
                            QualityUnitedWriters stands out for its commitment to excellence, timely delivery, and personalized approach to every students needs.
                        </p>
                        <h2 className="text-orange-400 font-semibold">How to get started?</h2>
                        <Steps />

                        <h2 className="text-orange-400 font-semibold">Our Values</h2>

                        <p className="pt-1 pb-2 text-lg">
                            Integrity, quality, and customer satisfaction are the core values that drive us. We believe in transparency and delivering work that exceeds expectations.
                        </p>

                        <h2 className="text-orange-400 font-semibold">Our Team</h2>

                        <p className="pt-1 pb-2 text-lg">
                            Meet our team of experienced writers and professionals, each dedicated to ensuring that you receive the best possible service.
                        </p>

                        <h2 className="text-orange-400 font-semibold">Contact Us</h2>

                        <p className="pt-1 pb-2 text-lg">
                            Have questions or need assistance? Feel free to reach out to our support team. We are here to help you.
                        </p>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
