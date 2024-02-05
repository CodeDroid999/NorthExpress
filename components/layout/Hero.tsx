/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="overflow-hidden pb-20 pt-20 md:pt-25 xl:pb-25 xl:pt-30">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
                        <div className=" md:w-1/2">
                            <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                                🔥 North Express - Travel with comfort.
                            </h4>
                            <h1 className="mb-5 pr-16 text-xl font-bold text-black dark:text-white xl:text-hero ">
                                Comfortable. Efficient. Affordable .
                            </h1>
                            <p>
                                Welcome to North Express, the brainchild of a group
                                of veteran logisticians redefining luxury transport on the
                                "Kenyan Landscape"; with unmatched customer experience and top-tier services.
                                At North Express, we are redefining the luxury transport, and setting new standards of excellence and reliability.
                            </p>


                        </div>


                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
