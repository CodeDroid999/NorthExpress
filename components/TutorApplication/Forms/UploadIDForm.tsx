/* eslint-disable react/no-unescaped-entities */
import { toast } from 'react-hot-toast';
import router, { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { addDoc, doc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import useFormStore from 'store/tutorApplication';
import { useState } from 'react';


interface Props {
    handlePreviousStep: () => void
}


export default function UploadIDForm({ handlePreviousStep }: Props) {
    const user = UserAuth();
    const userId = user?.userId;
    const [uploadFiles, setUploadFiles] = useState({ front: null, back: null });
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState({ front: null, back: null });

    const step1 = useFormStore((state) => state.step1)
    const step2 = useFormStore((state) => state.step2)
    const step3 = useFormStore((state) => state.step3)

    const { firstName, lastName, country, address, city,
        userState, howHeard, lastSchoolName, major, isSchoolTeacher, hasAffiliation,
        jobTitle, employer, startDate, endDate } = step1
    const { selectedSubjects, selectedRate } = step2
    const { selectedTopic, skillAssessmentDocUrl } = step3


    const handleDrop = (e, side) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFiles((prevFiles) => ({ ...prevFiles, [side]: droppedFile }));
    };

    const handleFileChange = (e, side) => {
        const file = e.target.files[0];
        setUploadFiles((prevUploadFiles) => ({ ...prevUploadFiles, [side]: file }));
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleNext = async (event: any) => {
        event.preventDefault()
        let hasError = false


        if (hasError) {
            return
        }

        const frontFile = uploadFiles.front;
        const backFile = uploadFiles.back;

        const storageRef = ref(storage, `IdPhotos/${userId}_IdDoc_front.${frontFile.name.split('.').pop()}`);
        const frontUrl = await uploadFileAndGetURL(storageRef, frontFile);

        const storageRef2 = ref(storage, `IdPhotos/${userId}_IdDoc_back.${backFile.name.split('.').pop()}`);
        const backUrl = await uploadFileAndGetURL(storageRef2, backFile);


        const docRef = await addDoc(collection(db, 'applications'), {
            firstName: firstName,
            lastName: lastName,
            country: country,
            address: address,
            city: city,
            userState: userState,
            howHeard: howHeard,
            lastSchoolName: lastSchoolName,
            major: major,
            isSchoolTeacher: isSchoolTeacher,
            hasAffiliation: hasAffiliation,
            jobTitle: jobTitle,
            employer: employer,
            startDate: startDate,
            endDate: endDate,
            selectedSubjects: selectedSubjects,
            selectedRate: selectedRate,
            selectedTopic: selectedTopic,
            skillAssessmentDocUrl: skillAssessmentDocUrl,
            IdDoc_FrontUrl: frontUrl,
            IdDoc_BackUrl: backUrl,
            createdAt: serverTimestamp(),
            userId: userId,
            applicationStatus: "Pending",
            idVerificationStatus: "Unverified",
            skillAssessmentStatus: "Unverified",
        })
        await addDoc(collection(db, 'mail'), {
            to: 'airtaska1@gmail.com',
            message: {
                subject: 'New Assignment',
                html: `A new assignment has been posted`,
            },
        })
        toast.success('Application has been posted')

        router.push("/tutor-application/success")
    }

    return (
        <div className="bg-white p-3">
            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Upload a photo of your ID Documents.
                </p>
                <p className="mb-1 rounded bg-blue-100 p-2 text-blue-600 md:text-sm">
                    Let's make it official! Upload a photo of your ID, passport, or driver's license.
                    Accepted file types: JPEG, PNG, or PDF. Ensure it's clear, and we'll handle the rest securely.
                </p>

                <p className="text-3xl font-bold text-blue-950">
                    Front
                </p>
                <div
                    className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                    onDrop={(e) => handleDrop(e, 'front')}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handleFileChange(e, 'front')}
                    />
                    <p>Drag and drop a file here or click to select</p>
                    {files.front && (
                        <div>
                            <p>Selected File: {files.front.name}</p>
                            <p>File Type: {files.front.type}</p>
                        </div>
                    )}
                </div>

                <p className="text-3xl font-bold text-blue-950">
                    Back
                </p>
                <div
                    className="drop-container h-40 flex align-center items-center justify-center rounded-md bg-gray-100 border-dashed border-2 border-sky-500 "
                    onDrop={(e) => handleDrop(e, 'back')}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, "
                        onChange={(e) => handleFileChange(e, 'back')}
                    />
                    <p>Drag and drop a file here or click to select</p>
                    {files.back && (
                        <div>
                            <p>Selected File: {files.back.name}</p>
                            <p>File Type: {files.back.type}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex-1 cursor-pointer rounded-xl bg-gray-300 py-2 text-center text-gray-700"
                        onClick={handlePreviousStep}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="flex-1 cursor-pointer rounded-xl bg-green-900 py-2 text-center text-white"
                        onClick={handleNext}
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    );
}


// Helper function
async function uploadFileAndGetURL(fileRef, file) {
    const snap = await uploadBytesResumable(fileRef, file);
    return await getDownloadURL(ref(storage, snap.ref.fullPath));
}