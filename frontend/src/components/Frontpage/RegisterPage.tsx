import { useEffect, useState } from "react";
import userService from "../../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";

interface props {
    firebaseAuth: object | null;
}

const RegisterPage = ({ firebaseAuth }: props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
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

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            if (!email || !password || !name) {
                toast.error("Please fill in all the fields.");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid;

            // Store only Firebase Auth UID and name in MongoDB
            const response = await userService.register({
                name,
                uid
            });

            if (!response) {
                throw new Error("Error creating user in MongoDB");
            }

            toast.success("Registered successfully! Welcome!");

            // // Add a delay before navigating to the login page
            // // this is needed because database delay, otherwise frontend will logout
            // setTimeout(() => {
            //     navigate("/login");
            // }, 2000); // Wait for 2 seconds
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
            console.log("Error while registering");
            console.log(error);
            toast.error("Error while registering, please try again later.");
            // If there's an error during registration, delete the user in Firebase Authentication
            if (auth.currentUser) {
                await auth.currentUser.delete();
                console.log("User deleted from Firebase Authentication due to backend error");
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
            <h1>Register</h1>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    onChange={handleEmailChange}
                    value={email}
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    onChange={handleNameChange}
                    value={name}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    onChange={handlePasswordChange}
                    value={password}
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <button className="btn" onClick={register}>
                Register
            </button>
        </div>
    );
};

export default RegisterPage;
