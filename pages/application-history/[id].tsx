import ImageHeader from 'components/TutorApplication/ImageHeader'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from 'public/QualityUnitedWritersLogo.png'
import React, { useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

import { auth } from '../../firebase'
import Navbar from 'components/layout/Navbar'
import ApplicationHistoryCard from 'components/applications/AppplicationHistoryCard'



export default function Step1() {
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/login`)
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleExit = () => {
        router.push('/')
    }
    return (
        <div>
            <Navbar />
            <div className="mx-auto w-full max-w-[1200px] px-3">
                <ImageHeader />
                <div className="mx-auto mt-28 min-w-100 shadow-2xl">
                    <ApplicationHistoryCard />
                </div>
            </div>
        </div>
    )
}
