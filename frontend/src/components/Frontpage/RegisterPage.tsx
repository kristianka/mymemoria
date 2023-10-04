import { useState } from "react";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    console.log("username", username);
    console.log("name", name);
    console.log("password", password);

    return (
        <div className="container mx-auto">
            <h1>Register</h1>
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
            <button className="btn">Register</button>
        </div>
    );
};

export default RegisterPage;
