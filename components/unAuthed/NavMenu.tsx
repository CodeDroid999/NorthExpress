/* eslint-disable react/jsx-no-undef */
import { UserAuth } from 'context/AuthContext';
import Link from 'next/link';
import React, { useState } from 'react';

const NavigationMenu: React.FC = (props: any) => {
  const { user, logOut } = UserAuth();
  const userRole = user?.role;
  const userId = user?.userId;
  const handleLogOut = () => {
    logOut();
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMainDropdown = () => {
    setIsMainDropdownOpen(!isMainDropdownOpen);
  };
  return (
    <div className=" w-100">
      <div className="absolute right-0 top-8 mt-2 z-50 min-w-[15rem] rounded-lg bg-white p-2 shadow-md ">
        <div className="rounded bg-gray-100 pt-2 pb-2 border">
          <Link href={`/public-profile/${user?.userId}`}>
            <span className="flex items-center gap-x-3.5 px-3 pt-1 text-sm text-blue-900 hover:bg-neutral-100 ">
              Hello {user?.firstName} {user?.lastName}
            </span>
          </Link>
        </div>
        <div className="flex ">
          {!user ? (
            <Link
              href="/signup"
              className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            >
              Sign In
            </Link>
          )}
        </div>
        <Link
          href={`/add-booking`}
        >
          Make Booking
        </Link>
        <Link
          href="bus-hire"
        >
          Hire a bus
        </Link>
        <Link
          href="/parcel"
        >
          Parcels
        </Link>
        <div className="flex ">
          {!user ? (
            <Link
              href="/login"
              className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            >
              Bus Hire
            </Link>
          ) : (
            <Link
              href="/browse-bookings"
              className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            >
              Sign Up
            </Link>
          )}
        </div>
        <div className="flex ">
          {!user ? (
            <Link
              href="/login"
              className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 mt-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100"
            >
              About Us
            </Link>
          ) : (
            <>
              <Link
                href={`/profile/${user?.userId}`}
              >
                My Profile
              </Link>
              <Link
                href={`/payment-history/${user?.userId}`}
              >
                Payment History
              </Link>
              <Link
                href={`/payment-methods/${user?.userId}`}
              >
                Payment Methods
              </Link>
              <div className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 ">
                <div
                  onClick={toggleDropdown}
                  className="mt-1 flex cursor-pointer items-center text-sm text-gray-800 hover:bg-gray-100 "
                >
                  Settings
                </div>
              </div>
              {isDropdownOpen && (
                <div className="flex flex-col rounded p-1 text-sm text-gray-800 w-100 bg-gray-200">
                  <Link
                    className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                    href={`/settings/mobile-number/${user?.userId}`}
                  >
                    Mobile
                  </Link>
                  <Link
                    className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                    href={`/settings/email/${user?.userId}`}
                  >
                    Email
                  </Link>
                  <Link
                    className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
                    href="/forgot-password"
                  >
                    Change password
                  </Link>
                </div>
              )}
              <div
                onClick={handleLogOut}
                className="bg-white- 500 flex items-center gap-x-3.5 rounded-md px-3 mb-1 py-2 text-sm text-gray-800 hover:bg-neutral-100 border w-100 "
              >
                Log out
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
