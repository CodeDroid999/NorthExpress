import { UserAuth } from 'context/AuthContext';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useFormStore from 'store/tutorApplication';
import CountrySelector from '../CountrySelector';

interface Props {
    handleNextStep: () => void
}


export default function InfoForm({ handleNextStep }: Props) {
    const { user } = UserAuth();
    const router = useRouter();

    // Define constants for state variables using useState
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [lastSchoolName, setLastSchoolName] = useState('');
    const [howHeard, setHowHeard] = useState('');
    const [major, setMajor] = useState('');
    const [isSchoolTeacher, setIsSchoolTeacher] = useState(null);
    const [hasAffiliation, setHasAffiliation] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    // Define constants for state variables using useState
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [cityError, setCityError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [lastSchoolNameError, setLastSchoolNameError] = useState('');
    const [howHeardError, setHowHeardError] = useState('');
    const [majorError, setMajorError] = useState('');
    const [isSchoolTeacherError, setIsSchoolTeacherError] = useState(''); // Updated
    const [hasAffiliationError, setHasAffiliationError] = useState(''); // Updated
    const [jobTitleError, setJobTitleError] = useState('');
    const [employerError, setEmployerError] = useState('');

    const setData = useFormStore((state) => state.setStep1Data)

    const handleNext = (event: any) => {
        event.preventDefault()
        let hasError = false
        if (!firstName) {
            setFirstNameError('* This field is required')
            hasError = true
        } else {
            setFirstNameError('')
        }

        if (!lastName) {
            setLastNameError('* This field is required')
            hasError = true
        } else {
            setLastNameError('')
        }

        if (!city) {
            setCityError('* This field is required')
            hasError = true
        } else {
            setCityError('')
        }

        if (!address) {
            setAddressError('* This field is required')
            hasError = true
        } else {
            setAddressError('')
        }

        if (!country) {
            setCountryError('* This field is required')
            hasError = true
        } else {
            setCountryError('')
        }

        if (!state) {
            setStateError('* This field is required')
            hasError = true
        } else {
            setStateError('')
        }

        if (!startDate) {
            setStartDateError('* This field is required')
            hasError = true
        } else {
            setStartDateError('')
        }

        if (!endDate) {
            setEndDateError('* This field is required')
            hasError = true
        } else {
            setEndDateError('')
        }

        if (!lastSchoolName) {
            setLastSchoolNameError('* This field is required')
            hasError = true
        } else {
            setLastSchoolNameError('')
        }

        if (!howHeard) {
            setHowHeardError('* This field is required')
            hasError = true
        } else {
            setHowHeardError('')
        }

        if (!major) {
            setMajorError('* This field is required')
            hasError = true
        } else {
            setMajorError('')
        }

        if (isSchoolTeacher === null) {
            setIsSchoolTeacherError('* This field is required');
            hasError = true;
        } else {
            setIsSchoolTeacherError('');
        }

        if (hasAffiliation === null) {
            setHasAffiliationError('* This field is required');
            hasError = true;
        } else {
            setHasAffiliationError('');
        }

        if (!jobTitle) {
            setJobTitleError('* This field is required')
            hasError = true
        } else {
            setJobTitleError('')
        }

        if (!employer) {
            setEmployerError('* This field is required')
            hasError = true
        } else {
            setEmployerError('')
        }

        if (hasError) {
            return
        }

        setData(
            firstName,
            lastName,
            country,
            address,
            city,
            state,
            howHeard,
            lastSchoolName,
            major,
            isSchoolTeacher,
            hasAffiliation,
            jobTitle,
            employer,
            startDate,
            endDate,
        );

        handleNextStep()

    }




    const currentDate = new Date().toISOString().split('T')[0]

    return (
        <div className="p-3 bg-white">
            <p className="mb-1 text-xs font-bold uppercase text-orange-400 text-right md:text-sm">
                Step 1
            </p>

            <form className="mt-6 flex flex-col gap-4 md:mt-8 md:pl-4">
                <p className="text-3xl font-bold text-blue-950">
                    Personal Information
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Let us know a bit about who you are. You must be able to verify your identity through a passport, drivers license, residency permit or ID card. Personal details will not be disclosed.
                </p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="firstName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g Albert"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {firstNameError && <span className="text-red-500">{firstNameError}</span>}
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g Einsten"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {lastNameError && <span className="text-red-500">{lastNameError}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label htmlFor="country of Nationality" className="mb-2 text-sm font-medium text-gray-700">
                            Choose your nationality
                        </label>
                        <CountrySelector country={country} setCountry={setCountry} />
                        {countryError && <span className="text-red-500">{countryError}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="Country of Residence"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Where do you live?
                        </label>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {addressError && <span className="text-red-500">{addressError}</span>}
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="City of residence"
                            className="mb-2 text-sm font-medium text-white"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {cityError && <span className="text-red-500">{cityError}</span>}
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="State of residence"
                            className="mb-2 text-sm font-medium text-white"
                        >
                            State
                        </label>
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {stateError && <span className="text-red-500">{stateError}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="flex col-md-8 col-sm-12 flex-col">
                        <label
                            htmlFor=" How did you hear about us?"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            How did you hear about us?
                        </label>
                        <input
                            type="text"
                            placeholder="e,g Social media, Video Advert, Fair, Friends"
                            value={howHeard}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
          font-medium outline-none focus:border-blue-500`}
                            onChange={(e) => setHowHeard(e.target.value)}
                        />
                        {howHeardError && <span className="text-red-500">{howHeardError}</span>}
                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">
                    Education
                </p>
                <div className="row">
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="lastSchoolName"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Name of the last school you attended
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name of the last school you attended"
                            value={lastSchoolName}
                            onChange={(e) => setLastSchoolName(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {lastSchoolNameError && <span className="text-red-500">{lastSchoolNameError}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="flex flex-col col-md-4">
                        <label
                            htmlFor="University Major"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            What is/was your field of study?
                        </label>
                        <input
                            type="text"
                            id="major"
                            placeholder="Enter your major"
                            onChange={(e) => setMajor(e.target.value)}
                            value={major} // Bind the input value to the 'major' state
                            className={`rounded-lg border bg-gray-50 px-1 py-2
      font-medium outline-none focus:border-blue-500`}
                        />
                        {majorError && <span className="text-red-500">{majorError}</span>}
                    </div>
                </div>

                <p className="text-3xl font-bold text-blue-950">
                    Academic Experience
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Note: You do not need to have any prior experience as a teacher to work at QualityUnitedWriters. Please be 100% truthful about your past work experience. Misrepresenting your work experience will result in your application being rejected or your account being banned in the future.
                </p>
                <div className="row">
                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">
                            Have you ever been a school teacher?
                        </div>
                        <div className="flex items-right space-x-4 justify-items-center mt-1">
                            <input
                                type="radio"
                                checked={isSchoolTeacher}
                                onChange={() => setIsSchoolTeacher(true)}
                                className="mr-2"
                            />
                            <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                Yes
                            </label>

                            <input
                                type="radio"
                                checked={!isSchoolTeacher}
                                onChange={() => setIsSchoolTeacher(false)}
                                className="mr-2"
                            />
                            <label htmlFor="Are you a teacher?" className="mb-2 text-sm font-medium text-gray-700">
                                No
                            </label>

                        </div>
                        {isSchoolTeacherError && <span className="text-red-500">{isSchoolTeacherError}</span>}
                    </div>

                    <div className="row flex justify-between col-md-12 col-sm-12 flex-col">
                        <div className="question col-md-8">
                            Do you have other professional affiliation with an academic institution?
                        </div>
                        <div className="flex items-right space-x-4 mt-1">
                            <input
                                type="radio"
                                checked={hasAffiliation}
                                onChange={() => setHasAffiliation(true)}
                                className="mr-2"
                            />
                            <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                Yes
                            </label>

                            <input
                                type="radio"
                                checked={!hasAffiliation}
                                onChange={() => setHasAffiliation(false)}
                                className="mr-2"
                            />
                            <label htmlFor="Do you have other professional affiliation with an academic institution?" className="mb-2 text-sm font-medium text-gray-700">
                                No
                            </label>

                        </div>
                        {hasAffiliationError && <span className="text-red-500">{hasAffiliationError}</span>}
                    </div>
                </div>



                <p className="text-3xl font-bold text-blue-950">
                    Work Experience
                </p>
                <p className="mb-1 p-2 rounded bg-blue-100 text-blue-600 md:text-sm">
                    Note: If unemployed, please write unemployed as your title, n/a for Employer, and the years you have been unemployed.
                </p>

                <div className="row">
                    <div className="flex col-md-3 flex-col">
                        <label
                            htmlFor="jobTitle"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            placeholder="Your Job Title"
                            onChange={(e) => setJobTitle(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {jobTitleError && <span className="text-red-500">{jobTitleError}</span>}
                    </div>
                    <div className="flex col-md-3 flex-col">
                        <label
                            htmlFor="Employer/company"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Employer/company
                        </label>
                        <input
                            type="text"
                            placeholder="Employer/company"
                            onChange={(e) => setEmployer(e.target.value)}
                            className={`rounded-lg border bg-gray-50 px-1 py-2
              font-medium outline-none focus:border-blue-500`}
                        />
                        {employerError && <span className="text-red-500">{employerError}</span>}
                    </div>
                    <div className="flex col-md-4 flex-col">
                        <label
                            htmlFor="startDate"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            Years worked
                        </label>

                        <div className="row">
                            <div className="flex col-md-5 flex-col">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className={`py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium outline-none focus:border-blue-500`}
                                />
                                {startDateError && <span className="text-red-500">{startDateError}</span>}
                            </div>
                            <div className="col-md-1 flex justify-center align-center items-center text-gray-400">
                                to
                            </div>
                            <div className="flex col-md-5 flex-col">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className={`py-2 px-1 w-full rounded-lg border bg-gray-50 text-sm font-medium outline-none focus:border-blue-500`}
                                />
                                {endDateError && <span className="text-red-500">{endDateError}</span>}
                            </div>

                        </div>
                    </div>
                </div>

                <div
                    className="mt-4 cursor-pointer rounded-xl bg-green-900 py-2 text-center text-white"
                    onClick={handleNext}
                >
                    Save and continue                </div>
            </form >
        </div >
    )
}
