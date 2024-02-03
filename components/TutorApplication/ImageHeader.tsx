import Home from 'components/layout/HomeSection';
import CustomNavbar from 'components/layout/Navbar';
import Image from 'next/image'
import HeroBackground from  "public/become_tutor_bg_2.jpg"
import React from 'react';

const ImageHeader = () => {
    return (
            <div className="hero_bg_box h-50">
                <div className="img-box">
                <Image
                    src={HeroBackground}
                    alt="assignment"
                    
                  />
                </div>
            </div>
    );
};

export default ImageHeader;