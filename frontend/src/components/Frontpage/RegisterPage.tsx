import { useState } from "react";
import userService from "../../services/user";
import loginService from "../../services/login";
import { LoggedInUser } from "../../types";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface props {
    user: LoggedInUser | null;
    setUser: (user: LoggedInUser | null) => void;
}

const RegisterPage = (props: props) => {
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

            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error);
                });

            navigate("/login");
            // const response = await userService.register({ username, name, password });
            // console.log(response);
            // const loginResponse = await loginService.login({ username, password });
            // props.setUser(loginResponse);
            // window.localStorage.setItem("LoggedUser", JSON.stringify(loginResponse));
            // navigate("/");
        } catch (error) {
            console.log("Hey! Error while registering");
            console.log(error);
        }
    };

    if (props.user) {
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
