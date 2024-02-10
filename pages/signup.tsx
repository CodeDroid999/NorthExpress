import React, { useState, useEffect } from 'react';
import AuthLayout from 'components/layout/AuthLayout';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { auth, db } from '../firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Head from 'next/head';
import axios from 'axios';

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/add-booking');
      }
    });
    return () => unsubscribe();
  }, [router, redirect]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    // Set the prompt option to force account selection
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = await addDoc(collection(db, 'users'), {
        userId: user.uid,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        profilePicture: '',
        role: 'Customer',
        email: user.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!email.includes('@')) {
      setEmailError('Enter a valid email!');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Send verification email
      await sendEmailVerification(user);
      // Display success message to user
      toast.success('Verification email has been sent. Please check your inbox.');
      //send welcome message to user
      // Create user data for the HTTP request
      const userData = {
        displayName: user.displayName, // Fill in the user's display name
        email: user.email, // Use the user's email
        phoneNumber: user.phoneNumber,
      };

      // Make the HTTP request to the api/welcomeuser route
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // JSX code for the component
    <AuthLayout>
      {/* Google Sign In button */}
      <div className="flex justify-center align-center pt-1 pb-2">
        <button
          type="button"
          className="flex w-100 flex-row items-center justify-center rounded-2xl border border-gray-400 bg-gray-100 px-8 py-2 text-lg font-medium text-green-950 hover:bg-green-900 hover:text-white"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2" size={20} />
          Continue with Google
        </button>
      </div>

      {/* OR separator */}
      <div className="text-center text-xs font-medium text-gray-700 pt-2 pb-2">OR</div>


      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="Display Name" className="mb-1 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              id="Full Name"
              name="Full Name"
              placeholder="Full Name"
              onChange={(e) => setDisplayName(e.target.value)}
              className={`h-full w-full rounded-lg border bg-gray-50 p-2
                outline-none focus:border-blue-500`}
            />
            {setDisplayNameError && <span className="text-red-500">{displayNameError}</span>}
          </div>
          <label htmlFor="Email" className="mb-1 font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            id="Email"
            name="Full Name"
            placeholder="johndoe@example,com"
            onChange={(e) => setEmail(e.target.value)}
            className={`h-full w-full rounded-lg border bg-gray-50 p-2
                outline-none focus:border-blue-500`}
          />
          {setEmailError && <span className="text-red-500">{emailError}</span>}
        </div>


        <div className="relative flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-700">
            Password
          </label>

          <div className="flex items-center">
            <input
              id="password"
              name="password"
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full rounded-lg border bg-gray-50 p-2
                outline-none focus:border-blue-500 "
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute right-2 "
            >
              {passwordVisible ? (
                <BsEyeFill size={18} />
              ) : (
                <BsEyeSlashFill size={18} />
              )}
            </button>
          </div>
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-green-900 hover:bg-green-900 px-4 py-2 text-white"
        >
          Sign Up
        </button>

        <div className="flex flex-row space-x-3 text-base font-normal justify-items-center items-center">
          <p className="pt-1 pb-2 text-lg">Already have an account?</p>
          <p className="font-medium text-green-500 hover:text-green-950 items-center">
            <Link href="/login">Log in</Link>
          </p>
        </div>

      </form>
    </AuthLayout>
  );
}
