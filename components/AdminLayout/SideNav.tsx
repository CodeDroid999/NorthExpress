import Link from 'next/link';
import React from 'react';

const AdminSideNav = () => {
  return (
    <div className="w-100">
      <div className="p-2 bg-blue-100 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/dashboard" className="bg-blue-100 text-blue-800 text-right whitespace-nowrap font-bold">
          Dashboard
        </Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/manage-applications" className="text-blue-800 text-right whitespace-nowrap">
          Applications
        </Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/manage-users" className="text-blue-800 text-right whitespace-nowrap">Accounts</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/manage-assignments" className="text-blue-800 text-right whitespace-nowrap">Assignments</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/manage-suspensions" className="text-blue-800 text-right whitespace-nowrap">Suspensions</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/support" className="text-blue-800 text-right whitespace-nowrap">Support</Link>
      </div>

      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/chats" className="text-blue-800 text-right whitespace-nowrap">Chats</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/studio" className="text-blue-800 text-right whitespace-nowrap">Edit Blogs</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/admin/manage-admins" className="text-blue-800 text-right whitespace-nowrap">Admin Accounts</Link>
      </div>
      <div className="p-2 flex font-bold items-center w-full border border-green-700">
        <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Forms</Link>
      </div>

    </div>
  );
};

export default AdminSideNav;
