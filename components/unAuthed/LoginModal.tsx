import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Link from 'next/link';

const LoginModal = ({ onClose }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { signInWithGoogle, signInWithEmailAndPassword } = userAuth(); // Adjust this based on your AuthContext

    const handleSignIn = async (event) => {
        event.preventDefault();
        // Your existing sign-in logic
    };

    return (
        <div className={overlay}>
            <div className={modal}>
                <button className={closeButton} onClick={onClose}>
                    X
                </button>

                {/* Your Google Sign In button */}
                <button
                    type="button"
                    className={googleSignInButton}
                    onClick={signInWithGoogle}
                >
                    <FcGoogle className={googleIcon} />
                    Log in with Google
                </button>

                {/* OR separator */}
                <div className={orSeparator}>OR</div>

                {/* Sign In form */}
                <form onSubmit={handleSignIn} className={form}>
                    {/* Email input */}
                    {/* ... your existing email input code ... */}

                    {/* Password input */}
                    {/* ... your existing password input code ... */}

                    {/* Continue button */}
                    <button type="submit" className={continueButton}>
                        Continue
                    </button>

                    {/* Sign up link */}
                    <div className={signUpLink}>
                        <p>Dont have an account?</p>
                        <p>
                            <Link href="/signup">Sign up</Link>
                        </p>
                    </div>

                    {/* Forgot password button */}
                    <button className={forgotPasswordButton}>
                        <Link href="/forgot-password">Forgot password?</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
function userAuth(): { signInWithGoogle: any; signInWithEmailAndPassword: any; } {
    throw new Error('Function not implemented.');
}

