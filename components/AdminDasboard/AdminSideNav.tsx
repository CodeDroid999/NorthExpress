import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SideNav = () => {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };
    return (
        <div className="hidden mx-auto md:block bg-gray-100 ">
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <div className="text-blue-800 text-right whitespace-nowrap hover:bg-gray-300" onClick={() => navigateTo('/admin/manage-applications')}>
                    Applications
                </div>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-applications" className="text-blue-800 text-right whitespace-nowrap">
                    Applications
                </Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-users" className="text-blue-800 text-right whitespace-nowrap">My Users</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-assignments" className="text-blue-800 text-right whitespace-nowrap">Assignments</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/privacy" className="text-blue-800 text-right whitespace-nowrap">Messages</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/support" className="text-blue-800 text-right whitespace-nowrap">Support</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/manage-suspensions" className="text-blue-800 text-right whitespace-nowrap">Suspensions</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/chats" className="text-blue-800 text-right whitespace-nowrap">Chat</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/studio" className="text-blue-800 text-right whitespace-nowrap">Edit Blog</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/how-it-works" className="text-blue-800 text-right whitespace-nowrap">Accounts</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Us Forms</Link>
            </div>
        </div>
    );
};

export default SideNav;
