
import StudentSteps from 'components/howitworks/Steps';
import Image from 'next/image'
import HeroBackground from "public/main_cover.jpg"
import React from 'react';

const HowItWorksSection = () => {
    return (
        <div className="container mx-auto pl-5">
            <h1 className="text-blue-800 text-center pt-3">How it works</h1>
            <p className=" text-center">
                Thousands of college students have used HomeWorkForYou as their secret weapon to make their life easier.
                <br></br>Now it is your turn.                        </p>
            <StudentSteps />
        </div>
    );
};

export default HowItWorksSection;
