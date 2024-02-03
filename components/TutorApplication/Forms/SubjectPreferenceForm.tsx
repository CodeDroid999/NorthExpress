import React, { useState } from 'react';
import { UserAuth } from 'context/AuthContext';
import useFormStore from 'store/tutorApplication';

interface Props {
    handleNextStep: () => void
    handlePreviousStep: () => void
}


export default function SubjectPreferenceForm({ handleNextStep, handlePreviousStep }: Props) {
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedRate, setSelectedRate] = useState('$10');
    // Define constants for state variables using useState
    const [selectedRateError, setSelectedRateError] = useState('');
    const [selectedSubjectsError, setSelectedSubjectsError] = useState('');

    const setData = useFormStore((state) => state.setStep2Data)

    const handleNext = (event: any) => {
        event.preventDefault();
        let hasError = false;

        if (!selectedSubjects.length) {
            setSelectedSubjectsError('* This field is required');
            hasError = true;
        } else {
            setSelectedSubjectsError('');
        }

        if (!selectedRate) {
            setSelectedRateError('* This field is required');
            hasError = true;
        } else {
            setSelectedRateError('');
        }

        if (hasError) {
            return;
        }

        setData(
            selectedSubjects,
            selectedRate
        );

        handleNextStep();
    };


    return (
        <div className="p-3 bg-white">
            <p className="mb-1 text-xs font-bold uppercase text-orange-400 text-right md:text-sm">
                Step 2/3
            </p>

            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">Subject Preference</p>

                <div className="mb-4">
                    <label className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                        Which subjects do you intend to tutor in? (at least one is required.)
                    </label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {['Business', 'Computer Science', 'Economics', 'Engineering', 'Foreign Languages', 'Health & Medical', 'Humanities', 'Law', 'Mathematics', 'Programming', 'Science', 'Writing', 'Other'].map(subject => (
                            <div key={subject} className="flex items-center justify-items-center align-items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={subject}
                                    checked={selectedSubjects.includes(subject)}
                                    onChange={() => {
                                        if (selectedSubjects.includes(subject)) {
                                            setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
                                        } else {
                                            setSelectedSubjects([...selectedSubjects, subject]);
                                        }
                                    }}
                                />
                                <label className="mt-2" htmlFor={subject}>{subject}</label>
                            </div>
                        ))}
                        {selectedSubjectsError && <span className="text-red-500">{selectedSubjectsError}</span>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                        Preferred Rates
                    </label>
                    <div className="flex items-center mt-2 space-x-2">
                        <select
                            value={selectedRate}
                            onChange={(e) => setSelectedRate(e.target.value)}
                            className="border rounded p-1"
                        >
                            {Array.from({ length: 15 }, (_, index) => (index + 1) * 10).map((rate) => (
                                <option key={rate} value={`$${rate}`}>
                                    {`$${rate} per hour`}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedRateError && <span className="text-red-500">{selectedRateError}</span>}
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
};
