import {
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Link from 'next/link';
import { UserAuth } from 'context/AuthContext';

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-500'; // Yellow color for pending
        case 'ID Verification':
            return 'bg-blue-500'; // Blue color for ID Verification
        case 'Reviewing':
            return 'bg-purple-500'; // Purple color for reviewing
        case 'Verified':
            return 'bg-green-900'; // Green color for verified
        case 'Rejected':
            return 'bg-red-500'; // Red color for rejected
        default:
            return 'bg-gray-500'; // Default to gray color
    }
};

const UserApplicationHistoryPage = () => {
    const [userApplications, setUserApplications] = useState([]);
    const { user } = UserAuth();
    const userId = user?.userId;

    useEffect(() => {
        const fetchUserApplications = async () => {
            try {
                const q = query(collection(db, 'applications'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const applicationsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        createdAt: doc.data().createdAt.toDate().toLocaleString(),
                        status: doc.data().applicationStatus,
                    }));
                    setUserApplications(applicationsData);
                } else {
                    console.error('No applications found for the user');
                }
            } catch (error) {
                console.error('Error fetching user applications:', error.message);
            }
        };

        if (userId) {
            fetchUserApplications();
        }
    }, [userId]);

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">Application History</p>
            {userApplications.length > 0 ? (
                <ul>
                    {userApplications.map((application) => (
                        <li key={application.id} className="mb-2">
                            <Link href={`/application/${application.id}`}>
                                <div className={`flex justify-between px-2 py-2 bg-gray-300 rounded`}>
                                    <div className="flex text-green-950">
                                        Application: <span className="text-blue-800 pl-1"> {application.id}</span>
                                    </div>
                                    <div className="flex text-green-950">
                                        {application.createdAt}, Status: <span className={`flex justify-between px-2 ml-1 text-white bg-gray-300 rounded ${getStatusColor(application.status)}`}>{application.status}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applications found for the user.</p>
            )}
        </div>
    );
};

export default UserApplicationHistoryPage;
