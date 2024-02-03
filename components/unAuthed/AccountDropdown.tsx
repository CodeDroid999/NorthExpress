import Avatar from 'components/layout/Avatar';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';

const AccountDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleMouseLeave = () => {
            setIsOpen(false);
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div
                className="flex items-center justify-center rounded-full bg-gray-800 px-2.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primary"

            >
                <span className="mr-2">Account</span>
                <Avatar />
            </div>
            {isOpen && (
                <div className="absolute shadow-2xl right-0 top-12 mt-2 min-w-[10rem] rounded-lg bg-gray-100 p-2">
                    <div className="w-100 flex flex-col">
                        <Link href="auth/signup" className="w-100 border border-gray-500 pl-2 hover:text-primary underline">
                            <div className="flex justify-items-center align-middle ">Sign up </div>
                        </Link>
                        <Link href="/auth/signin" className="w-100 border border-gray-500 pl-2 hover:text-primary underline">
                            <div className="flex justify-items-center align-middle ">Log in </div>
                        </Link>
                        <Link href="book-a-ticket" className="w-100 border border-gray-500 pl-2 hover:text-primary underline">
                            <div className="flex justify-items-center align-middle ">Book a ticket </div>
                        </Link>
                        <Link href="/support" className="w-100 border border-gray-500 pl-2 hover:text-primary underline">
                            <div className="flex justify-items-center align-middle ">Support</div>
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountDropdown;
