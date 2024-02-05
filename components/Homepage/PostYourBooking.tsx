import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { UserAuth } from 'context/AuthContext';
import { db } from '../../firebase';
import {
    addDoc,
    collection,
    serverTimestamp,
    getDoc,
    doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router from 'next/router';
import Link from 'next/link';

interface Props {
    handleNextStep: () => void;
}

export default function PostYourBooking() {
    const { user } = UserAuth();
    const currentDate = new Date().toISOString().split('T')[0];
    const auth = getAuth();
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedFromCounty, setSelectedFromCounty] = useState('');
    const [selectedToCounty, setSelectedToCounty] = useState('');
    const [departureDate, setDepartureDate] = useState(`${currentDate}`);
    const [showLoginModal, setShowLoginModal] = useState(false);


    const handleFromCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFromCounty(e.target.value);
    };

    const handleToCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToCounty(e.target.value);
    };

    const handleMakeBooking = async () => {
        try {
            // Validate input if needed

            // Set userId based on authentication status
            const visitor = auth.currentUser;
            const currentUserId = visitor ? visitor.uid : 'visitor_u';

            // Add data to Firestore
            const bookingData = {
                fromCounty: selectedFromCounty,
                toCounty: selectedToCounty,
                departureDate: departureDate,
                userId: currentUserId,
                timestamp: serverTimestamp(),
            };

            // Replace 'YOUR_COLLECTION_NAME' with the actual collection name
            const docRef = await addDoc(collection(db, 'YOUR_COLLECTION_NAME'), bookingData);

            // Redirect to make-booking-page
            router.push('/make-booking-page');
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to make booking. Please try again.');
        }
    };

    useEffect(() => {
        // Fetch userId from the database if the user is logged in
        const fetchUserId = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.userId));
                    if (userDoc.exists()) {
                        setUserId(userDoc.data().userId);
                    }
                } catch (error) {
                    console.error('Error fetching userId:', error);
                }
            } else {
                // Show login modal if the user is not logged in
                setShowLoginModal(true);
            }
        };

        fetchUserId();
    }, [user]);

    return (
        <div className="detail-box bg-transparent px-4 ">
            <div className="container justify-center">
                <p className="mb-4 text-left l-2">
                    <span className="text-2xl font-bold text-blue-950 bg-gray-100 p-2">
                        Travel Destinations
                    </span>
                </p>
            </div>

            <div className="container flex flex-col justify-center rounded-xl  bg-gray-100">


                <p className="flex items-right align-center">
                    <input
                        type="radio"
                        checked={true}
                        className="mr-2 text-lg"
                    />
                    <label htmlFor="Ticket types?" className="my-2 text-md font-medium text-blue-950">
                        One way
                    </label>
                </p>

                <div className="row flex justify-between">
                    <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                        <label
                            htmlFor="title"
                            className="mb-2 text-lg font-medium text-blue-950 whitespace-nowrap"
                        >
                            From
                        </label>
                        <div className="mb-1">
                            <select
                                value={selectedFromCounty}
                                onChange={handleFromCountyChange}
                                className="rounded border p-1"
                            >
                                <option value="">Select a destination</option>
                                <option value="Business">Business</option>


                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 pb-2 flex flex-col ">
                        <label
                            htmlFor="budget"
                            className="mb-2 text-lg font-medium text-blue-950"
                        >
                            To
                        </label>
                        <div className="mb-1">
                            <select
                                value={selectedToCounty}
                                onChange={handleToCountyChange}
                                className="rounded border p-1"
                            >
                                <option value="">Select a destination</option>
                                <option value="Business">Business</option>


                                {/* Add more options as needed */}
                            </select>
                        </div>

                    </div>
                    <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                        <label
                            htmlFor="departureDate"
                            className="mb-2 text-lg font-medium text-blue-950 whitespace-nowrap"
                        >
                            Departure
                        </label>
                        <input
                            type="date"
                            id="DepartureDate"
                            required
                            placeholder="Enter date"
                            min={currentDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="border rounded p-1 sm:w-full"
                        />

                    </div>
                    <div className="col-md-3 col-sm-6 pb-2 flex flex-col flex-end justify-end align-center ">
                        <Link
                            className="btn-1 bg-yellow-500 p-2 rounded text-white"
                            href="/post-assignment"
                        >
                            Make Booking
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}