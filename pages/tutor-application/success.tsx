import Link from "next/link";
import { TfiClose } from "react-icons/tfi";
import Image from "next/image"
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import useFormStore from "store/tutorApplication";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "../../public/QualityUnitedWritersLogo.png"
import ImageHeader from "components/TutorApplication/ImageHeader";
import ThankYouPage from "components/TutorApplication/ThankyouPage";
import { auth } from "../../firebase";

export default function PostAssignment() {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/login?redirect=/tutor-application/success`);
            }
        });
        return () => unsubscribe();
    },);

    const handleExit = () => {
        router.push('/');
    };

    return (
        <div>
            <header className="flex flex-row  justify-between items-center bg-white  px-4 ">
                <header className="flex flex-row  justify-between items-center bg-white  px-4 w-screen">
                    <div className="flex flex-row items-center">
                        <div className="mr-1">
                            <h1 className="text-4xl font-bold">
                                <Link href="/" className="text-gray-700">
                                    <div className="mb-1">
                                        <Image
                                            src={Logo}
                                            alt="assignment"
                                            className="h-[50px] w-[100%] md:h-[100px] lg:h-[60px] lg:w-[50px]"
                                        />
                                    </div>
                                </Link>
                            </h1>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="px-2 py-1 border border-gray-900 rounded-md shadow-md">
                            <Link href={'/setup-profile'}>        Switch to Student Mode</Link>
                        </div>
                        <div className="cursor-pointer " onClick={handleExit}>
                            <TfiClose size={32} className="font-bold shadow-md p-1 text-blue-900" />
                        </div>
                    </div>
                </header>
            </header>
            <div className="mx-auto w-full max-w-[1200px] px-3">
                <ImageHeader />
                <div className="mx-auto mt-20 min-w-100 shadow-2xl">
                    <div className="mx-auto mt-10 "><ThankYouPage /></div>
                </div>
            </div>
        </div>
    );
}
