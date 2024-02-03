import { Switch } from '@headlessui/react'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import router, { useRouter } from 'next/router'; 
import Cookies from 'js-cookie';
import Link from 'next/link';


type ContactFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
};

type ContactFormProps = {
    onSubmit: (formData: ContactFormData) => void;
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [agreed, setAgreed] = useState(false)
    const [previousPageURL, setPreviousPageURL] = useState('');
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    useEffect(() => {
        // Store the previous page URL in a cookie
        if (typeof window !== 'undefined') {
          setPreviousPageURL(Cookies.get('previousPageURL'));
          Cookies.set('previousPageURL', window.location.href, { expires: 7 }); // Store the current page URL
        }
      }, []); // <-- Make sure to pass an empty dependency array
    
      // ...
    

    // Add state variables for field validation
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [messageValid, setMessageValid] = useState(true);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validation logic
        if (name === 'firstName') {
            setFirstNameValid(value.trim() !== '');
        } else if (name === 'lastName') {
            setLastNameValid(value.trim() !== '');
        } else if (name === 'email') {
            setEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim()));
        } else if (name === 'phoneNumber') {
            setPhoneNumberValid(value.trim() !== '');
        } else if (name === 'message') {
            setMessageValid(value.trim() !== '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            firstNameValid &&
            lastNameValid &&
            emailValid &&
            phoneNumberValid &&
            messageValid
        ) {
            onSubmit(formData);

            // Redirect to thank you page after sending the message
            router.push('/thankyou');

        } else {
            toast.error('Please fill in all required fields correctly.');
        }
    };


    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
                <p className="mt-2 text-lg text-left   text-gray-600">
                    We value your feedback, inquiries, and messages. Whether you have questions about our services,
                    want to report an issue, or simply wish to say hello, we are here to listen and assist. Please feel
                    free to reach out to us using the form below, and we will get back to you as soon as possible. Your input
                    is essential to us, and we look forward to connecting with you.
                </p>
            </div>
            <form action="#" onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!firstNameValid ? 'border-red-500' : ''
                                    }`}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!lastNameValid ? 'border-red-500' : ''
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!emailValid ? 'border-red-500' : ''
                                    }`}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-2 pr-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                >
                                    <option>AUS</option>
                                </select>

                            </div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phone-number"
                                autoComplete="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`block w-full leading-8 rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!phoneNumberValid ? 'border-red-500' : ''
                                    }`}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Message
                        </label>
                        <div className="mt-2.5">

                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!firstNameValid ? 'border-red-500' : ''
                                    }`}
                            />

                        </div>
                    </div>
                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                )}
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </div>
                        <Switch.Label className="text-sm leading-6 text-gray-600">
                            By selecting this, you agree to our{' '}
                            <Link href="#" className="font-semibold text-indigo-600">
                                privacy&nbsp;policy
                            </Link>
                            .
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        send message
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
