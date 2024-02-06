// components/UserAssignmentTab.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { formatDate } from 'pages/public-profile/[id]';
import router from 'next/router';
import { db } from '../../firebase';

const UserAssignmentTab = () => {
    const userId = router.query.id
    const [userAssignments, setUserAssignments] = useState([]);

    useEffect(() => {
        const fetchUserAssignments = async () => {
            try {
                const q = query(collection(db, 'bookings'), where('student.userId', '==', userId), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const bookings = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.createdAt = formatDate(data.createdAt.toDate());
                    return { id: doc.id, ...data };
                });

                setUserAssignments(bookings);
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        };

        fetchUserAssignments();
    }, [userId]);

    return (
        <div className="mt-20">
            <div className="border border-green-800 rounded-xl pb-3">
                <p className="bg-green-900 w-full p-3 text-white">User Assignments</p>
                <div className="flex flex-col flex-grow w-full bg-white p-2">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="">Title</th>
                                <th className="text-center">Due Date</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Budget</th>
                                <th className="text-center">Bids</th>
                            </tr>
                        </thead>
                        <tbody className="pt-2 pb-2">
                            {userAssignments.map((booking, index) => (
                                <tr
                                    key={booking.id}
                                    className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
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
    );
};

export default UserAssignmentTab;
