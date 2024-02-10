import React from 'react';
import Footer from 'components/layout/Footer';
import HomeArea from 'components/layout/HomeSectionBluse';
import AppplyNowHero from 'components/Become-a-tutor/ApplyNowSection';
import HighestEarners from 'components/Become-a-tutor/HighestEarnersSection';
import FAQAccordion from 'components/FAQaccordions';
import DiscoverDestinations from 'components/Homepage/DiscoverDestinations';
import TopDestinations from 'components/home/TopDestinations';
import Features from 'components/home/Features';

const About: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full">
                <HomeArea />
            </div>
            <DiscoverDestinations />
            s            <Features />
            <TopDestinations />
            <AppplyNowHero />
            <HighestEarners />

            <FAQAccordion />
            <Footer />
        </div>
    );
};

export default About;
