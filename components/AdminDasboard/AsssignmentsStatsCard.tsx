import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    query,
} from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

const AssignmentsStatsCard = () => {
    const [stats, setStats] = useState({
        totalAssignments: 0,
        assignedAssignments: 0,
        biddingOpen: 0,
        completedAssignments: 0,
        cancelledAssignments: 0,
    });

    useEffect(() => {
        const fetchAssignmentStats = async () => {
            try {
                const assignmentsSnapshot = await getDocs(collection(db, 'assignments'));

                const totalAssignments = assignmentsSnapshot.docs.length;
                const assignedAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Assigned').length;
                const biddingOpen = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Open').length;
                const completedAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Closed').length;
                const cancelledAssignments = assignmentsSnapshot.docs.filter(doc =>
                    doc.data().status === 'Cancelled').length;

                setStats({
                    totalAssignments,
                    assignedAssignments,
                    biddingOpen,
                    completedAssignments,
                    cancelledAssignments,
                });
            } catch (error) {
                console.error('Error fetching assignment stats:', error.message);
            }
        };

        fetchAssignmentStats();
    }, []);

    return (
        <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{stats.biddingOpen}</p>
                    <p className="text-center text-blue-900 font-bold border">Bidding</p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{stats.assignedAssignments}</p>
                    <p className="text-center text-blue-900 font-bold border">Assigned </p>
                </div>

                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{stats.completedAssignments}</p>
                    <p className="text-center text-blue-900 font-bold border">Completed </p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{stats.cancelledAssignments}</p>
                    <p className="text-center text-blue-900 font-bold border">Cancelled </p>
                </div>
                <div>
                    <p className="text-center text-green-800 font-bold mb-1 whitespace-nowrap shadow-inner rounded">{stats.totalAssignments}</p>
                    <p className="text-center text-blue-900 font-bold border">Total </p>
                </div>
            </div>
            <div className="divide border-2 w-full mt-2 mb-2"></div>
            <Link href="/admin/manage-assignments" className="flex align-items-right w-100">
                <span className="rounded bg-green-900 hover:bg-green-800 px-1 text-white">Manage</span>
            </Link>
        </div>
    );
};

export default AssignmentsStatsCard;
