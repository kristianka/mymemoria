import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import userService from "../../services/user";
import { auth } from "../../firebase";
import { FireBaseUserInterface } from "../../types";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const RegisterPage = ({ firebaseAuth }: props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            if (!email || !password || !name || !confirmPassword) {
                toast.error("Please fill in all the fields.");
                return;
            }

            if (password !== confirmPassword) {
                toast.error("Passwords do not match. Please try again.");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Store only Firebase Auth UID and name in MongoDB
            const response = await userService.register({
                name,
                uid
            });

            if (!response) {
                throw new Error("Error creating user in MongoDB");
            }

            toast.success("Registered successfully! Welcome!");
        } catch (error) {
            // Handle form errors. First, Firebase errors
            if (error instanceof FirebaseError) {
                if (error.code === "auth/missing-email" || error.code === "auth/missing-password") {
                    toast.error("Please fill in all the fields.");
                    return;
                }
                if (error.code === "auth/email-already-in-use") {
                    toast.error("Email already in use. Please try again with a different email.");
                    return;
                }

                if (error.code === "auth/invalid-email") {
                    toast.error("Invalid email. Please try again.");
                    return;
                }

                if (error.code === "auth/weak-password") {
                    toast.error("Weak password. Please try again.");
                    return;
                }
            }

            // If you get here, the problem is with the custom backend and not Firebase
            toast.error("Error while registering, please try again later.");
            // Delete the user in Firebase Authentication if the backend fails
            if (auth.currentUser) {
                await auth.currentUser.delete();
            }
        }
    };

    // if user is already logged in, redirect to home page
    useEffect(() => {
        document.title = "Register | Notes";
        if (firebaseAuth) {
            navigate("/");
        }
    }, [navigate, firebaseAuth]);

    return (
        <div className="container mx-auto">
            <div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create an account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={handleEmailChange}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={name}
                                        onChange={handleNameChange}
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={handlePasswordChange}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Confirm password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={handleRegister}
                                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
