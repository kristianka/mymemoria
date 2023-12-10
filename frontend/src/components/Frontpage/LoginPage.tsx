import { useEffect, useState } from "react";
import loginService from "../../services/login";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../../types";
import notesService from "../../services/notes";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface props {
    user: LoggedInUser | null;
    setUser: (user: LoggedInUser | null) => void;
    setNotificationContent: (content: string | null) => void;
    setNotificationType: (type: string | null) => void;
}

const LoginPage = ({ user, setUser, setNotificationContent, setNotificationType }: props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    navigate("/notes");
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });

            // const data = await loginService.login({ username, password });
            // window.localStorage.setItem("LoggedUser", JSON.stringify(data));
            // notesService.setToken(data.token);
            // setUser(data);
            // navigate("/");
            // setNotificationContent("Welcome back, " + data.name + " 👋");
            // setNotificationType("login");
            // setTimeout(() => {
            //     setNotificationContent(null);
            //     setNotificationType(null);
            // }, 5000);
        } catch (error) {
            console.log("Hey! Error while logging in");
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
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
                        </div>

                        <div>
                            <button
                                onClick={login}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register
                        </a>
                    </p>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Forgot your password?{" "}
                        <a
                            href="/reset-password"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Reset password
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
