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

export default function AddBookingForm() {
    const { user } = UserAuth();
    const currentDate = new Date().toISOString().split('T')[0];
    const auth = getAuth();
    const [userId, setUserId] = useState<string | null>(null);
    const [pickup, setPickup] = useState('Eldoret');
    const [dropoff, setDropoff] = useState('Kisumu');
    const [travelDate, setTravelDate] = useState(`${currentDate}`);


    const handlePickupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPickup(e.target.value);
    };

    const handleDropoffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDropoff(e.target.value);
    };

    const handleMakeBooking = async () => {
        try {
            // Validate input if needed

            // Set userId based on authentication status
            const visitor = auth.currentUser;
            const currentUserId = visitor ? visitor.uid : 'visitor_u';

            // Add data to Firestore
            const bookingData = {
                pickup: pickup,
                dropoff: dropoff,
                travelDate: travelDate,
                userId: currentUserId,
                timestamp: serverTimestamp(),
            };

            // Replace 'YOUR_COLLECTION_NAME' with the actual collection name
            const docRef = await addDoc(collection(db, 'bookings'), bookingData);
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to make booking. Please try again.');
        }
    };



    return (
        <div className="detail-box bg-transparent px-4 ">
            <div className="container justify-center">
                <p className="mb-4 text-left l-2">
                    <span className="text-2xl font-bold text-blue-950 bg-gray-100 p-2">
                        Travel Destinations
                    </span>
                </p>
            </div>

            <div className="container flex flex-col justify-center rounded-xl  bg-gray-100 mx-2">


                <p className="flex items-right align-center">
                    <input
                        type="radio"
                        value="true"
                        className="mr-2 text-lg text-blue-500 font-bold"
                    />
                    <label htmlFor="Ticket types?" className="my-2 text-md font-medium text-blue-950">
                        One way
                    </label>
                </p>

                <div className="row flex justify-between">
                    <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                        <label
                            htmlFor="title"
                            className="mb-2 text-lg font-medium text-blue-950 text-left  whitespace-nowrap"
                        >
                            From
                        </label>
                        <div className="mb-1">
                            <select
                                value={pickup}
                                onChange={handlePickupChange}
                                className="rounded border p-1 text-blue-950 w-full"
                            >
                                <option value="">{pickup}</option>
                                <option value="baringo">Baringo</option>
                                <option value="bomet">Bomet</option>
                                <option value="bungoma">Bungoma</option>
                                <option value="busia">Busia</option>
                                <option value="elgeyo marakwet">Elgeyo Marakwet</option>
                                <option value="embu">Embu</option>
                                <option value="garissa">Garissa</option>
                                <option value="homa bay">Homa Bay</option>
                                <option value="isiolo">Isiolo</option>
                                <option value="kajiado">Kajiado</option>
                                <option value="kakamega">Kakamega</option>
                                <option value="kericho">Kericho</option>
                                <option value="kiambu">Kiambu</option>
                                <option value="kilifi">Kilifi</option>
                                <option value="kirinyaga">Kirinyaga</option>
                                <option value="kisii">Kisii</option>
                                <option value="kisumu">Kisumu</option>
                                <option value="kitui">Kitui</option>
                                <option value="kwale">Kwale</option>
                                <option value="laikipia">Laikipia</option>
                                <option value="lamu">Lamu</option>
                                <option value="machakos">Machakos</option>
                                <option value="makueni">Makueni</option>
                                <option value="mandera">Mandera</option>
                                <option value="meru">Meru</option>
                                <option value="migori">Migori</option>
                                <option value="marsabit">Marsabit</option>
                                <option value="mombasa">Mombasa</option>
                                <option value="muranga">Muranga</option>
                                <option value="nairobi">Nairobi</option>
                                <option value="nakuru">Nakuru</option>
                                <option value="nandi">Nandi</option>
                                <option value="narok">Narok</option>
                                <option value="nyamira">Nyamira</option>
                                <option value="nyandarua">Nyandarua</option>
                                <option value="nyeri">Nyeri</option>
                                <option value="samburu">Samburu</option>
                                <option value="siaya">Siaya</option>
                                <option value="taita taveta">Taita Taveta</option>
                                <option value="tana river">Tana River</option>
                                <option value="tharaka nithi">Tharaka Nithi</option>
                                <option value="trans nzoia">Trans Nzoia</option>
                                <option value="turkana">Turkana</option>
                                <option value="uasin gishu">Uasin Gishu</option>
                                <option value="vihiga">Vihiga</option>
                                <option value="wajir">Wajir</option>
                                <option value="pokot">West Pokot</option>


                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 pb-2 flex flex-col ">
                        <label
                            htmlFor="budget"
                            className="mb-2 text-lg font-medium text-blue-950 text-left "
                        >
                            To
                        </label>
                        <div className="mb-1">
                            <select
                                value={dropoff}
                                onChange={handleDropoffChange}
                                className="rounded border p-1 text-blue-950 w-full"
                            >
                                <option value="">{dropoff}</option>
                                <option value="baringo">Baringo</option>
                                <option value="bomet">Bomet</option>
                                <option value="bungoma">Bungoma</option>
                                <option value="busia">Busia</option>
                                <option value="elgeyo marakwet">Elgeyo Marakwet</option>
                                <option value="embu">Embu</option>
                                <option value="garissa">Garissa</option>
                                <option value="homa bay">Homa Bay</option>
                                <option value="isiolo">Isiolo</option>
                                <option value="kajiado">Kajiado</option>
                                <option value="kakamega">Kakamega</option>
                                <option value="kericho">Kericho</option>
                                <option value="kiambu">Kiambu</option>
                                <option value="kilifi">Kilifi</option>
                                <option value="kirinyaga">Kirinyaga</option>
                                <option value="kisii">Kisii</option>
                                <option value="kisumu">Kisumu</option>
                                <option value="kitui">Kitui</option>
                                <option value="kwale">Kwale</option>
                                <option value="laikipia">Laikipia</option>
                                <option value="lamu">Lamu</option>
                                <option value="machakos">Machakos</option>
                                <option value="makueni">Makueni</option>
                                <option value="mandera">Mandera</option>
                                <option value="meru">Meru</option>
                                <option value="migori">Migori</option>
                                <option value="marsabit">Marsabit</option>
                                <option value="mombasa">Mombasa</option>
                                <option value="muranga">Muranga</option>
                                <option value="nairobi">Nairobi</option>
                                <option value="nakuru">Nakuru</option>
                                <option value="nandi">Nandi</option>
                                <option value="narok">Narok</option>
                                <option value="nyamira">Nyamira</option>
                                <option value="nyandarua">Nyandarua</option>
                                <option value="nyeri">Nyeri</option>
                                <option value="samburu">Samburu</option>
                                <option value="siaya">Siaya</option>
                                <option value="taita taveta">Taita Taveta</option>
                                <option value="tana river">Tana River</option>
                                <option value="tharaka nithi">Tharaka Nithi</option>
                                <option value="trans nzoia">Trans Nzoia</option>
                                <option value="turkana">Turkana</option>
                                <option value="uasin gishu">Uasin Gishu</option>
                                <option value="vihiga">Vihiga</option>
                                <option value="wajir">Wajir</option>
                                <option value="pokot">West Pokot</option>


                                {/* Add more options as needed */}
                            </select>
                        </div>

                    </div>
                    <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                        <label
                            htmlFor="travelDate"
                            className="mb-2 text-lg font-medium text-blue-950 text-left  whitespace-nowrap"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="travelDate"
                            required
                            placeholder="Enter date"
                            min={currentDate}
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            className="border rounded p-1 sm:w-full text-blue-950"
                        />

                    </div>
                    <div className="col-md-3 col-sm-6 pt-2 sm:pb-3 flex flex-col flex-items-end">
                        <Link
                            className="btn-1 bg-yellow-600 p-2 rounded text-gray-100 text-center"
                            href="/add-booking"
                        >
                            Make Booking
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}