import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { UserAuth } from 'context/AuthContext';
import { storage } from '../../../firebase';
import useFormStore from 'store/tutorApplication';
import { getStorage, uploadBytesResumable, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


interface Props {
    handleNextStep: () => void
    handlePreviousStep: () => void
}


export default function SkillAssessmentForm({ handleNextStep, handlePreviousStep }: Props) {
    const { userId } = UserAuth();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [file, setFile] = useState(null);
    const [problemStatement, setProblemStatement] = useState('');

    const setData = useFormStore((state) => state.setStep3Data)

    const problemStatements = {
        Business: "Write an essay discussing the impact of digital marketing on modern businesses.",
        Law: "Discuss the role of precedent in the legal system and its importance in judicial decision-making.",
        Programming: "Explain the concept of asynchronous programming and its advantages in web development.",
        Engineering: "Design a sustainable solution for waste management in urban areas, considering environmental impact and resource efficiency.",
        ForeignLanguages: "Write a short essay on the cultural significance of language preservation in indigenous communities.",
        Maths: "Explore the applications of differential equations in modeling real-world phenomena, such as population growth or fluid dynamics.",
        Writing: "Compose a persuasive argument discussing the impact of technology on modern communication and interpersonal relationships.",
        Humanities: "Analyze a historical event and its implications on contemporary society, highlighting the interconnectedness of historical and cultural developments.",
        Science: "Investigate the environmental factors contributing to climate change and propose evidence-based solutions for mitigation.",
        HealthMedical: "Examine the ethical considerations in medical research involving human subjects, addressing issues of informed consent and privacy protection.",
        // Add more subjects and corresponding problem statements as needed
    };


    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };
    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSelectedTopic(selectedSubject);
        setProblemStatement(problemStatements[selectedSubject]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleNext = async () => {
        // Validate form data
        if (!selectedTopic || !file) {
            toast.error('Please select a topic and upload a valid .doc or .docx file');
            return;
        }

        try {
            // Generate a unique filename for the uploaded file
            const filename = `SkillAssessmentDocs/${userId}_${file.name}`;

            // Create a reference to the file in the SkillAssessmentDocs folder
            const storageRef = ref(storage, filename);

            const uploadTask = uploadBytes(storageRef, file);

            await uploadTask;

            // Get the download URL of the uploaded file
            const skillAssessmentDocUrl = await getDownloadURL(storageRef);

            // Store the selectedTopic and SkillAssessmentDocUrl in the form store
            setData(selectedTopic, skillAssessmentDocUrl);

            // Proceed to the next step
            handleNextStep();
        } catch (error) {
            console.error('Error submitting Skill Assessment:', error.message);
            toast.error('Error submitting Skill Assessment. Please try again.');
        }
    };



    return (
        <div className="bg-white p-3">
            <p className="mb-1 text-right text-xs font-bold uppercase text-orange-400 md:text-sm">
                Skill Assessment 2/3
            </p>

            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Short Questions : Writing Skills Assessment
                </p>
                <p className="mb-1 rounded bg-blue-100 p-2 text-blue-600 md:text-sm sm:text-sm">
                    Strong written communication skills are essential to succeed as a
                    tutor on Qualityunitedwriters as you will be expected to explain difficult
                    academic questions in writing. To assess your writing skills, we ask
                    that you provide a short written answer based on the topic of your
                    choice. Make sure to pay attention to the requirements.
                </p>

                <div className="">
                    <label className="text-xl font-bold text-blue-950">
                        What would you like to write about?
                    </label>
                </div>
                <div className="mb-1">
                    <select
                        value={selectedTopic}
                        onChange={handleSubjectChange}
                        className="rounded border p-1"
                    >
                        <option value="">Select a subject</option>
                        <option value="Business">Business</option>
                        <option value="Law">Law</option>
                        <option value="Programming">Programming</option>
                        <option value="Economics">Economics</option>
                        <option value="Engineering">Engineering</option>
                        <option value="ForeignLanguages">Foreign Languages</option>
                        <option value="Maths">Maths</option>
                        <option value="Writing">Writing</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Science">Science</option>
                        <option value="HealthMedical">Health & Medical</option>

                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Display the problem statement based on the selected subject */}
                {problemStatement && (
                    <div className="mb-1">
                        <p className="text-xl font-bold text-blue-950">Problem Statement:</p>
                        <p>{problemStatement}</p>
                    </div>
                )}
                <div className="mb-4 ">
                    <p className="text-xl font-bold text-blue-950">Requirements:</p>
                    <div className="p-2">
                        <ul className="list-inside list-disc">
                            <li>
                                Must be typed out (handwritten answers will be rejected and
                                result in an immediate decline of your application)
                            </li>
                            <li>Between 200 and 500 words</li>
                            <li>
                                Must be free of plagiarism, including any text generated by
                                artificial intelligence such as ChatGPT
                            </li>
                            <li>Proper grammar practice and no spelling mistakes</li>
                            <li>
                                Failing to meet our quality standards will result in your
                                application being rejected
                            </li>
                        </ul>
                        <p className="pt-1 pb-1">At least one example of correct use of all of the following:</p>
                        <ul className="list-inside list-disc">
                            <li>Commas</li>
                            {/* Add more requirements as needed */}
                        </ul>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-xl font-bold text-blue-950">Upload your file:</label>
                    <div
                        className="border-dashed border-2 border-gray-300 p-4"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <p className="text-gray-500">Drag and drop your file here</p>
                        <p className="text-gray-500">or</p>
                        <input type="file" onChange={handleFileChange} />
                    </div>
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
