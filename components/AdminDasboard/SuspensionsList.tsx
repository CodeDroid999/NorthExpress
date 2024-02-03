import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Link from 'next/link';
import Image from 'next/image';
import profile from 'public/profile.jpeg';

const SuspensionsPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'), where('accountStatus', '==', 'suspended'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const usersData = querySnapshot.docs.map((doc) => ({
                        id: doc.data().userId,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        profilePicture: doc.data().profilePicture,
                        email: doc.data().email,
                        role: doc.data().role,
                        accountStatus: doc.data().accountStatus,
                        // Add more user details as needed
                    }));
                    setUsers(usersData);
                } else {
                    console.error('No users found in the database');
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-3 bg-white">
            <p className="text-3xl font-bold text-blue-950 mb-4">Suspended Accounts</p>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="mb-2">
                            <Link href={`/admin/manage-account/${user.id}`}>
                                <div className="flex justify-between px-2 py-2 bg-gray-300 rounded">
                                    <div className="flex text-green-950 space-x-1 justify-items-center align-items-center">
                                        <Image
                                            src={user?.profilePicture || profile}
                                            alt="profile"
                                            width={25}
                                            height={25}
                                            className="h-[1.6rem] w-[1.6rem] cursor-pointer rounded-full object-cover"
                                        />
                                        <div className="grid grid-cols-2 gap-1">
                                            <div className="flex justify-items-center w-[170px] align-items-center">
                                                <span className="pr-1 text-green-900">{user.firstName} </span>
                                                <span className="pr-1 text-green-900">{user.lastName}</span>
                                            </div>
                                            <div className="flex space-x-1">
                                                <div className="text-blue-800 text-center rounded shadow-inner border-2 px-1">
                                                    {user.role}
                                                </div>
                                                <div className="flex text-blue-800 text-center rounded shadow-inner border-2 px-1">
                                                    {user.accountStatus}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex max-w-[200px] gap-1">
                                        <div className="bg-blue-800 rounded text-gray-100 text-center px-1 py-1 shadow">
                                            Manage Account
                                        </div>
                                    </div>
                                    {/* Add more user details as needed */}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading suspended accounts ...</p>
            )}
        </div>
    );
};

export default SuspensionsPage;
