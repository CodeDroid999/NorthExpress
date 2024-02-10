import router from 'next/router';
import React from 'react';
import Image from 'next/image';
import profile from "public/profile.jpeg";

const Avatar = () => {
    const handleAccountClick = () => {
        router.push('/login');
    };

    return (
        <div className="relative z-50">
            <div
                onClick={handleAccountClick}
                className="flex items-center justify-center border border-gray-100 shadow-inner rounded-full bg-transparent px-2.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primary"
            >
                <span className="mr-2 md:text-lg font-medium text-xs text-white hover:text-blue-600">
                    Account
                </span>
                <div className="inline-flex justify-end">
                    <span>
                        <Image
                            src={profile}
                            alt="profile"
                            width={25}
                            height={25}
                            className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
