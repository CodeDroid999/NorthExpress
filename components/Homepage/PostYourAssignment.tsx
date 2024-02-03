import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UserAuth } from 'context/AuthContext';
import { db } from '../../firebase';
import {
    addDoc,
    collection,
    getDocs,
    serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router from 'next/router';
import Link from 'next/link';

interface Props {
    handleNextStep: () => void;
}

export default function PostYourAssignment() {
    const { user } = UserAuth();
    const userId = user?.userId;

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueDateError, setDueDateError] = useState('');
    const [budget, setBudget] = useState('');
    const [budgetError, setBudgetError] = useState('');

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if the user is logged in
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            // User is not logged in, show toast error
            toast.error('You are not logged in. Signup and log in to post your assignment');
            return;
        }

        let hasError = false;

        // Validate title
        if (!title) {
            setTitleError('* This field is required');
            hasError = true;
        } else if (title.length < 10) {
            setTitleError('Must be at least 10 characters');
            hasError = true;
        } else {
            setTitleError('');
        }

        // Validate dueDate
        if (!dueDate) {
            setDueDateError('* This field is required');
            hasError = true;
        } else {
            setDueDateError('');
        }

        // Validate budget
        if (!budget) {
            setBudgetError('* This field is required');
            hasError = true;
        } else {
            const budgetValue = Number(budget);
            if (isNaN(budgetValue) || budgetValue < 5 || budgetValue > 9999) {
                setBudgetError('The price must be between $5 and $9999');
                hasError = true;
            } else {
                setBudgetError('');
            }
        }

        if (hasError) {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'assignments'), {
                title: title,
                dueDate: dueDate,
                budget: budget,
                status: 'Open',
                createdAt: serverTimestamp(),
                student: {
                    userId: userId,
                    price: '',
                    bookingFee: '',
                    finalPrice: '',
                },
                tutor: {
                    userId: '',
                    price: '',
                    serviceFee: '',
                    finalPrice: '',
                    proposal: '',
                },
                paymentRequested: false,
                paymentReleased: false,
                studentReview: false,
                tutorReview: false,
            });

            const assignmentId = docRef.id;
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);

            const userEmails: string[] = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.email) {
                    userEmails.push(userData.email);
                }
            });
            await addDoc(collection(db, 'mail'), {
                to: 'qualityunited340@gmail.com',
                bcc: userEmails,
                message: {
                    subject: 'New Assignment     ',
                    html: `A new assignment has been posted`,
                },
            });

            //toast.success('Assignment      has been posted');
            // You can redirect to the assignment page or do any other necessary action
            router.push(`/post-assignment`);
        } catch (error) {
            console.error('Error posting assignment:', error.message);
            toast.error('Error posting assignment. Please try again.');
        }
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div className="w-full bg-green-900 pb-4 pt-4">
            <div className="container">
                <p className="pt-3 text-center text-3xl font-bold text-white">
                    Get Homework Help
                </p>
                <p className="text-gray text-center text-gray-200">
                    Find a tutor to help you with your school!
                </p>
                <form className="mt-6 flex justify-center">
                    <div className="row flex justify-between w-full">
                        <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                            <label
                                htmlFor="title"
                                className="mb-2 text-lg font-medium text-gray-100 whitespace-nowrap"
                            >
                                What do you need done?
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Dissertation writing for Engineering Paper"
                                onChange={(e) => setTitle(e.target.value)}
                                className="border rounded p-1"
                            />
                            {titleError && (
                                <span className="text-red-500">{titleError}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-md-3 col-sm-6 pb-2">
                            <label
                                htmlFor="dueDate"
                                className="mb-2 text-lg font-medium text-gray-100 whitespace-nowrap"
                            >
                                When do you need this done?
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                required
                                placeholder="Enter date"
                                min={currentDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="border rounded p-1 sm:w-full"
                            />
                            {dueDateError && (
                                <span className="text-red-500">{dueDateError}</span>
                            )}
                        </div>
                        <div className="col-md-3 col-sm-6 pb-2 flex flex-col ">
                            <label
                                htmlFor="budget"
                                className="mb-2 text-lg font-medium text-gray-100"
                            >
                                Willing to pay
                            </label>
                            <input
                                placeholder="$ Enter budget"
                                onChange={(e) => setBudget(e.target.value)}
                                className="border rounded p-1"
                            />
                            {budgetError && (
                                <span className="text-red-500">{budgetError}</span>
                            )}
                        </div>
                        <div className="col-md-3 col-sm-6 pb-2 flex flex-col flex-end justify-end align-center ">
                            <Link
                                className="btn-1 bg-yellow-500 p-2 rounded text-white"
                                href="/post-assignment"
                            >
                                Post Assignment
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
