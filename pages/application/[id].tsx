import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import router from 'next/router';
import Navbar from 'components/AdminLayout/Navbar';

export default function ManageApplicationDetailsPage() {
    const id = router.query.id.toString()
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const docRef = doc(db, 'applications', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setApplication(docSnap.data());
                } else {
                    console.log('Application not found');
                }
            } catch (error) {
                console.error('Error fetching application:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!application) {
        return <p>Application not found</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="mt-28 mx-4">
                <div className="w-full">
                    <h1>Application Details</h1>
                    <p>First Name: {application.firstName}</p>
                    <p>Last Name: {application.lastName}</p>
                    {/* Display other application data */}
                </div>
            </div>
        </div>
    );


}
