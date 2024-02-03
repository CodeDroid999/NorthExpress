import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import router from 'next/router';
import Navbar from 'components/AdminLayout/Navbar';
import ImageHeader from 'components/TutorApplication/ImageHeader';
import Link from 'next/link';
import ApproveSkillAssessment from 'components/adminActions/ApproveSkillAssessment';
import RejectSkillAssessment from 'components/adminActions/RejectSkillAssessment';
import ApproveIdDocs from 'components/adminActions/ApproveIdDocs';
import RejectIdDocs from 'components/adminActions/RejectIDocs';
import AcceptApplication from 'components/adminActions/AcceptApplication';
import RejectApplication from 'components/adminActions/RejectApplication';



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
                <ImageHeader />
                <div className="bg-gray-100 p-3 flex flex-col mx-auto ">
                    <p className="text-3xl font-bold text-blue-950">Profile Assessment</p>
                    <div className="row mb-4 mt-2">
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <Link href={`/public-profile/${application.userId}`} target="_blank" className="rounded-lg border-2
                            text-center text-blue-600  hover:shadow bg-white
                             hover:bg-blue-500 px-1 py-2 border-blue-600 font-medium">View Applicant Profile</Link>
                        </div>
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <Link href={`/admin/manage-account/${application.userId}`} target="_blank" className="rounded-lg border-2
                            text-center text-blue-600  hover:shadow bg-white
                             hover:bg-blue-500 px-1 py-2 border-blue-600 font-medium">Manage Applicant Account</Link>
                        </div>

                    </div>
                    <p className="text-3xl font-bold text-blue-950 mb-4">Personal Information</p>

                    <div className="row mt-2">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.firstName}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.lastName}</p>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-700">
                                Nationality
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.country}</p>
                        </div>
                        <div className="flex col-md-2 flex-col">
                            <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-700">
                                Verification Status
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium text-green-950">
                                {application.idVerificationStatus}</p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="Country of Residence" className="mb-2 text-sm font-medium text-gray-700">
                                Adress
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.address}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="City of residence" className="mb-2 text-sm font-medium text-gray-700">
                                City
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.city}</p>
                        </div>
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="State of residence" className="mb-2 text-sm font-medium text-gray-700">
                                State
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.userState}</p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="flex col-md-8 col-sm-12 flex-col">
                            <label htmlFor="How did you hear about us?" className="mb-2 text-sm font-medium text-gray-700">
                                Channel of Advertisement they learnt about QualityUnitedWriters
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.howHeard}</p>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Education</p>
                    <div className="row mt-2">
                        <div className="flex col-md-4 flex-col">
                            <label htmlFor="lastSchoolName" className="mb-2 text-sm font-medium text-gray-700">
                                Name of the last school attended
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.lastSchoolName}</p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="flex flex-col col-md-4">
                            <label htmlFor="University Major" className="mb-2 text-sm font-medium text-gray-700">
                                Field of study?
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.major}</p>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Academic Experience</p>

                    <div className="row mt-2">
                        <div className="row mt-2 flex justify-between col-md-12 col-sm-12 flex-col">
                            <div className="question col-md-8">
                                Has applicant ever been a school teacher?
                            </div>
                            <div className="flex items-right space-x-4 justify-items-center mt-1">
                                <input
                                    type="radio"
                                    checked={application.isSchoolTeacher}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    checked={!application.isSchoolTeacher}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="row mt-2 flex justify-between col-md-12 col-sm-12 flex-col">
                            <div className="question col-md-8">
                                Does Applicant have other professional affiliation with an academic institution?
                            </div>
                            <div className="flex items-right space-x-4 mt-1">
                                <input
                                    type="radio"
                                    checked={application.hasAffiliation}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                    Yes
                                </label>
                                <input
                                    type="radio"
                                    checked={!application.hasAffiliation}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950 mt-4">Work Experience</p>

                    <div className="row mt-2">
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="jobTitle" className="mb-2 text-sm font-medium text-gray-700">
                                Job Title
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.jobTitle}</p>
                        </div>
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="Employer/company" className="mb-2 text-sm font-medium text-gray-700">
                                Employer/company
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.employer}</p>
                        </div>
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="Employer/company" className="mb-2 text-sm font-medium text-gray-700">
                                From
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.startDate}</p>
                        </div>
                        <div className="flex col-md-3 flex-col">
                            <label htmlFor="Employer/company" className="mb-2 text-sm font-medium text-gray-700">
                                To
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.endDate}</p>
                        </div>

                    </div>
                    <p className="text-3xl font-bold text-blue-950">Subject Preference</p>

                    <div className="mb-4">
                        <label className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                            Which subjects does applicant intend to tutor in? (Value determines which type of account the user will get once screening is done)
                        </label>
                        <div className="flex bg-white flex-wrap gap-4 mt-2  p-1 border border-green-950">
                            {application.selectedSubjects.map((subject, index) => (
                                <div key={index} className="flex items-center rounded justify-items-center align-items-center space-x-2 p-1 bg-gray-100 border-green-950">{subject}</div>
                            ))}
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950">Skill Assessment</p>
                    <div className="row mt-2">
                        <div className="flex col-md-3 col-sm-4 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                Selected Account type
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.selectedTopic}</p>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="flex col-md-5 col-sm-12 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                Skill Assessment Question
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">{application.selectedTopic}</p>
                        </div>
                        <div className="flex col-md-3 col-sm-12 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                Skill Assessment Answer
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                                <Link href={application.skillAssessmentDocUrl} target="_blank" className="text-blue-600 px-1 py-2 font-medium">View Answer</Link>
                            </p>
                        </div>
                        <div className="flex col-md-3 col-sm-12 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                Skill Assessment Status
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-1 font-medium">
                                <p className="text-green-950 px-1 py-2 font-medium">{application.skillAssessmentStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <ApproveSkillAssessment applicationId={id} />

                        </div>
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <RejectSkillAssessment applicationId={id} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950">Applicant ID verification</p>
                    <div className="row mt-2">
                        <div className="flex col-md-3 col-sm-5 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                ID document: Front
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                                <Link href={application.IdDoc_FrontUrl} target="_blank" className="text-blue-600 px-1 py-2 font-medium">View ID</Link>
                            </p>
                        </div>
                        <div className="flex col-md-3 col-sm-5 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                ID document: Back
                            </label>
                            <p className="rounded-lg border bg-gray-50 px-1 py-2 font-medium">
                                <Link href={application.IdDoc_BackUrl} target="_blank" className="text-blue-600 px-1 py-2 font-medium">View ID</Link>
                            </p>
                        </div>
                        <div className="flex col-md-3 col-sm-5 flex-col">
                            <label htmlFor="Problem statement?" className="mb-2 text-sm font-medium text-gray-700">
                                ID Verification Status
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-1 font-medium">
                                <p className="text-green-950 px-1 py-2 font-medium">{application.idVerificationStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4 mt-2">
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <ApproveIdDocs applicationId={id} />

                        </div>
                        <div className="flex col-md-3 col-sm-6 flex-col">
                            <RejectIdDocs applicationId={id} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-blue-950">Overall Assessment</p>
                    <div className="row mb-4 mt-2">
                        <div className="flex col-md-6 col-sm-6 flex-col">
                            <AcceptApplication applicationId={id} />
                        </div>
                        <div className="flex col-md-6 col-sm-6 flex-col">
                            <RejectApplication applicationId={id} />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );


}
