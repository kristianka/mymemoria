import { useState } from "react";
import loginService from "../../services/login";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../types";

interface props {
    setUser: (user: UserInterface | undefined) => void;
}

const LoginPage = (props: props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            const response = await loginService.login({ username, password });
            console.log(response);
            props.setUser(response);
            window.localStorage.setItem("LoggedUser", JSON.stringify(response));
            navigate("/");
        } catch (error) {
            console.log("Hey! Error while logging in");
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto px-4 align-content: center">
            <h1>Login</h1>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    onChange={handleUsernameChange}
                    value={username}
                    type="text"
                    placeholder="Username"
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
            <button onClick={login} className="btn">
                Login
            </button>
        </div>
    );
};

export default LoginPage;
