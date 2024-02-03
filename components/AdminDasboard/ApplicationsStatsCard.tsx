import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';



const ApplicationsStatsCard = () => {
    const [applicationStats, setApplicationStats] = useState({
        totalApplications: 0,
        rejected: 0,
        pending: 0,
        accepted: 0,
        verification: 0,
    });

    useEffect(() => {
        const fetchApplicationStats = async () => {
            try {
                const q = query(collection(db, 'applications'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const applicationData = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                    }));

                    const totalApplications = applicationData.length;
                    const rejected = applicationData.filter((application) => application.applicationStatus === 'Rejected').length;
                    const accepted = applicationData.filter((application) => application.applicationStatus === 'Accepted').length;
                    const pending = applicationData.filter((application) => application.applicationStatus === 'Pending').length;
                    const verification = applicationData.filter((application) => application.applicationStatus === 'Verification').length;

                    setApplicationStats({
                        totalApplications,
                        rejected,
                        accepted,
                        pending,
                        verification,
                    });
                } else {
                    console.error('No users found in the database');
                }
            } catch (error) {
                console.error('Error fetching user stats:', error.message);
            }
        };

        fetchApplicationStats();
    }, []);

    return (
        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Applications</h2>
            <div className="grid grid-cols-5 gap-4">


                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{applicationStats.pending}</p>
                    <p className="text-center text-blue-900 font-bold border">Pending</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{applicationStats.verification}</p>
                    <p className="text-blue-800 font-bold whitespace-nowrap">Verification</p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{applicationStats.accepted}</p>
                    <p className="text-center text-blue-900 font-bold border">Accepted</p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{applicationStats.rejected}</p>
                    <p className="text-center text-blue-900 font-bold border">Rejected</p>
                </div>
                <div className="border">
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{applicationStats.totalApplications}</p>
                    <p className="text-center text-blue-900 font-bold border">Total</p>
                </div>
            </div>
            <div className="divide border-2 w-full mt-2 mb-2"></div>
            <Link href="/admin/manage-applications" className="flex align-items-right w-100">
                <span className="rounded bg-green-900 hover:bg-green-800 px-1 text-white">Manage</span>
            </Link>
        </div>
    );
};

export default ApplicationsStatsCard;
