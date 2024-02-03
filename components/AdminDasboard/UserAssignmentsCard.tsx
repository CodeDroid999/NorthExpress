// components/UserAssignmentCard.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { formatDate } from 'pages/public-profile/[id]';
import { db } from 'firebase';
import router from 'next/router';

const UserAssignmentCard = () => {
    const userId = router.query.id
    const [userAssignments, setUserAssignments] = useState([]);

    useEffect(() => {
        const fetchUserAssignments = async () => {
            try {
                const q = query(collection(db, 'assignments'), where('student.userId', '==', userId), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const assignments = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.createdAt = formatDate(data.createdAt.toDate());
                    return { id: doc.id, ...data };
                });

                setUserAssignments(assignments);
            } catch (error) {
                console.error('Error fetching user assignments:', error);
            }
        };

        fetchUserAssignments();
    }, [userId]);

    return (
        <div className="mt-20">
            <div className="border border-green-800 rounded-xl pb-3">
                <p className="bg-green-900 w-full p-3 text-white">User Assignments</p>
                <div className="flex flex-col flex-grow w-full This account  p-2">
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
                            {userAssignments.map((assignment, index) => (
                                <tr
                                    key={assignment.id}
                                    className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                >
                                    <td className="pl-2 pt-1">{assignment.title}</td>
                                    <td className="text-center">{assignment.dueDate}</td>
                                    <td className="text-center">{assignment.status}</td>
                                    <td className="text-center">{assignment.budget}</td>
                                    <td className="text-center">{assignment.offers.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserAssignmentCard;
