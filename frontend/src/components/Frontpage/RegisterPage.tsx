import { useState } from "react";
import userService from "../../services/user";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

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

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid;

            // Store only Firebase Auth UID and name in MongoDB
            const response = await userService.register({
                name,
                uid
            });

            console.log(response);
            console.log(user);
            navigate("/login");
        } catch (error) {
            console.log("Error while registering");
            console.log(error);

            // If there's an error during registration, delete the user in Firebase Authentication
            if (auth.currentUser) {
                await auth.currentUser.delete();
                console.log("User deleted from Firebase Authentication due to backend error");
            }

            // TO DO: Show error msg
        }
    };

    if (firebaseAuth) {
        navigate("/");
    }

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
