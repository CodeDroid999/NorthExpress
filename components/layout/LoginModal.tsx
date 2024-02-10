/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const LoginModal = () => {
    const router = useRouter();


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">

            <div className="bg-white rounded p-8 w-96 shadow-md">
                <div className="flex">
                    <div
                        onClick={() => {
                            router.push('/login');
                        }}
                        className="bg-green-500 text-white border-none p-2 rounded cursor-pointer text-center w-full"
                    >
                        Login
                    </div>
                </div>

                <div className="text-center text-sm text-gray-700 my-4">OR</div>

                <div className="flex flex-col gap-4">
                    <div
                        onClick={() => {
                            router.push('/')
                        }}
                        className="bg-gray-100 text-red-500 border-none p-2 rounded cursor-pointer border-2 border-red-500 text-center hover:text-white hover:bg-red-500"
                    >
                        Continue without login
                    </div>

                    <div className="flex flex-row space-x-3 text-lg text-gray-700">
                        <p className="pt-1 pb-2 text-lg">Don't have an account?</p>
                        <p
                            className="font-medium text-green-900"
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            Sign up
                        </p>
                    </div>

                    <div
                        onClick={() => {
                            router.push('/forgot-password');
                        }}
                        className="bg-transparent border-none text-blue-500 text-sm cursor-pointer"
                    >
                        Forgot password?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
