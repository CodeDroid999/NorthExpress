/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

interface Option {
    name: string;
}

const addBookingForm: React.FC = () => {
    const [pickup, setPickup] = useState<Option>({ name: 'Nairobi' });
    const [dropoff, setDropoff] = useState<Option>({ name: 'Webuye' });
    const [travelDate, setTravelDate] = useState<Date>(new Date());

    const handlePickupChange = (option: Option | null) => {
        if (option) {
            setPickup(option);
        }
    };

    const handleDropoffChange = (option: Option | null) => {
        if (option) {
            setDropoff(option);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setTravelDate(date);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Your form submission logic here
    };

    return (
        <div className="bg-gray-900 py-10">
            <div className="container mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Nairobi - Webuye</h1>
                            <p className="text-gray-500">2024-02-08</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <div className="relative">
                                    {/* Ng-select for pickup */}
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <div className="relative">
                                    {/* Ng-select for dropoff */}
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <div className="relative">
                                    <input
                                        required
                                        type="date"
                                        placeholder="Datepicker"
                                        name="traveldate"
                                        className="block w-full py-3 px-4 leading-tight rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500"
                                        value={travelDate.toISOString().split('T')[0]}
                                        onChange={handleDateChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 mb-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Make a Booking
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-xl font-bold">Nairobi - Webuye</h4>
                    <p className="text-gray-500">2024-02-08</p>
                </div>
            </div>
        </div>
    );
};

export default addBookingForm;
