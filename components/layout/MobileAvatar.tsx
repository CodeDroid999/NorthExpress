import { UserAuth } from 'context/AuthContext';
import Image from 'next/image';
import React from 'react';
import profile from 'public/profile.jpeg';

export default function MobileAvatar() {
  const user = UserAuth();


  return (
    <div className="relative z-50">
      <div className="flex items-center justify-center border border-gray-100 shadow-inner rounded-full bg-transparent px-2.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primary"
      >
        <span className="mr-2 md:text-lg font-medium text-xs hover:text-green-500">
          Account
        </span>
        <div className="inline-flex justify-end ">
          <span>
            <Image
              src={user?.profilePicture || profile}
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
}
