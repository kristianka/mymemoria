import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";
import { FireBaseUserInterface } from "../../types";
import { useTranslation } from "react-i18next";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const LoginPage = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // avoids button spam via frontend, but of course it can be spammed via backend
    // and user can refresh the page to reset the cooldown
    const [isPasswordResettingCooldown, setIsPasswordResettingCooldown] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            const res = await signInWithEmailAndPassword(auth, email, password);
            const { uid, emailVerified, metadata } = res.user;
            const neededUserData: FireBaseUserInterface = {
                email: res.user.email,
                uid,
                emailVerified,
                metadata
            };

            setFirebaseAuth(neededUserData);
            toast.success(`${t("loggedInSuccessfully")}😃`);
            navigate("/");
        } catch (error) {
            // Handle form errors. First, Firebase errors
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-email") {
                    toast.error(t("invalidEmail"));
                    return;
                }
                if (error.code === "auth/missing-email" || error.code === "auth/missing-password") {
                    toast.error(t("pleaseFillAllFields"));
                    return;
                }
                if (error.code === "auth/invalid-credential") {
                    toast.error(t("invalidCredentials"));
                    return;
                }
            }

            console.log(error);
        }
    };

    const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success(t("passwordResetEmailSent"));
            toast.info(t("passwordResetInfo"));
            // cooldown for 1 minute
            setIsPasswordResettingCooldown(true);
            setTimeout(() => {
                setIsPasswordResettingCooldown(false);
            }, 60000);
        } catch (error) {
            // Handle form errors. First, Firebase errors
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-email") {
                    toast.error(t("invalidEmail"));
                    return;
                }
                if (error.code === "auth/missing-email") {
                    toast.error(t("missingEmail"));
                    return;
                }
            }
            toast.error(t("passwordResetEmailError"));
            console.error(error);
        }
    };

    useEffect(() => {
        if (firebaseAuth) {
            navigate("/");
        }
    }, [navigate, firebaseAuth]);

    document.title = t("login") + " | " + t("appName");

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {t("signInToYourAccount")}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("email")}
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
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("password")}
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
                        </div>

                        <div>
                            <button
                                onClick={handleLogin}
                                type="submit"
                                id="signin"
                                className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                {t("signIn")}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {t("dontHaveAnAccount")}{" "}
                        <Link
                            to="/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            {t("signUp")}
                        </Link>
                    </p>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        {t("forgotPassword")}{" "}
                        <button
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            onClick={handleForgotPassword}
                            disabled={isPasswordResettingCooldown}
                        >
                            {t("resetPassword")}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
