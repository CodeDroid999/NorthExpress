import React from 'react';
import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { formatDate } from '../../pages/profile/[id]'
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Footer from 'components/layout/Footer';

const ManageAssignments: React.FC = (props: any) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const { assignments } = props;

    const handleNavigation = (assignmentId: string) => {
        router.push(`/manage-assignment/${assignmentId}`); // Change to your desired route
    };

    return (
        <div className="mx-auto w-full">
            <div className="mt-20 h-screen overflow-hidden">
                <div className="border border-green-800 rounded-xl pb-3 h-80">
                    <p className="bg-green-900 w-full p-3 text-white">Manage Assignments</p>
                    <div className="flex flex-col flex-grow w-full bg-white p-2">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="">Title</th>
                                    <th className="text-center">Due Date</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Budget</th>
                                    <th className="text-center">Number of Bids</th>
                                </tr>
                            </thead>
                            <tbody className="pt-2 pb-2">
                                {assignments.map((assignment, index) => (
                                    <tr
                                        key={assignment.id}
                                        className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                                        onClick={() => handleNavigation(assignment.id)}
                                        style={{ cursor: 'pointer' }}
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
            <Footer />
        </div>
    );
};

export default ManageAssignments;

export async function getServerSideProps() {
    try {
        const q = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const assignments = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                data.createdAt = formatDate(data.createdAt.toDate());
                const id = doc.id;

                // Check if userId is available directly in the assignment data
                if (data.userId) {
                    const userQuery = query(collection(db, 'users'), where('userId', '==', data.userId));
                    const usersSnapshot = await getDocs(userQuery);

                    // Check if there is at least one user document
                    if (usersSnapshot.docs.length > 0) {
                        const studentDoc = usersSnapshot.docs[0];
                        const studentData = studentDoc.data();
                        studentData.createdAt = formatDate(studentData.createdAt.toDate());

                        const offersCollectionRef = collection(db, 'assignments', id, 'offers');
                        const offersQuerySnapshot = await getDocs(offersCollectionRef);

                        const offers = offersQuerySnapshot.docs.map((offerDoc) => {
                            const offerData = offerDoc.data();
                            offerData.createdAt = formatDate(offerData.createdAt.toDate());
                            return {
                                offerId: offerDoc.id,
                                ...offerData,
                            };
                        });

                        return { id, ...data, offers, studentDetails: studentData };
                    } else {
                        console.error(`No user document found for userId: ${data.userId}`);
                    }
                } else {
                    console.error(`No userId field available for assignment with id: ${id}`);
                }

                return null; // Return null for assignments without proper user information
            })
        );

        // Filter out null values from the assignments array
        const validAssignments = assignments.filter((assignment) => assignment !== null);

        return {
            props: {
                assignments: validAssignments,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        return {
            props: {
                assignments: [], // Initialize assignments as an empty array in case of an error
            },
        };
    }
}
