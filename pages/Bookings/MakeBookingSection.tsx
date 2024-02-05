import React from 'react';



export default function MakeBookingSection() {
    <div className="mt-20 h-screen overflow-hidden">
        <div className="border border-green-800 rounded-xl pb-3 h-80">
            <p className="bg-green-700 w-full p-3 text-white">Make Money by Helping with Homework</p>
            <div className="flex flex-col flex-grow w-full bg-white p-2">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="">Title</th>
                            <th className="text-center">Due Date</th>
                            <th className="text-center">Bidding</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Bids</th>
                        </tr>
                    </thead>
                    <tbody className="pt-2 pb-2">
                        {bookings.map((booking, index) => (
                            <tr
                                key={booking.id}
                                className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                onClick={() => handleNavigation(booking.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="pl-2 pt-1">{booking.title}</td>
                                <td className="text-center">{booking.dueDate}</td>
                                <td className="text-center">{booking.status}</td>
                                <td className="text-center">{booking.budget}</td>
                                <td className="text-center">{booking.offers.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};

