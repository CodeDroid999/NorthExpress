import React from 'react';
import Alert from './Alert';
import CustomNavbar from './Navbar';
import Image from 'next/image';
import { height } from '../OpenGraphImage';

const HeroArea: React.FC = () => {
    return (
        <header id="home" className="header_section">
            <div className="hero_bg_box">
                <div className="img-box">
                    <Image
                        src="https://i.postimg.cc/156hSWwZ/sewan.png"
                        width={1440}
                        height={600}
                        alt="" />
                </div>
            </div>
            <div className="">
                <Alert />
            </div>
            <div className="header_bottom sticky">
                <CustomNavbar />
            </div>
        </header>
    );
};

export default HeroArea;
