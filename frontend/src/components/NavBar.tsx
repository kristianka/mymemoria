import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useUser from "../hooks/useUser";

import { useQueryClient } from "@tanstack/react-query";
import { FireBaseUserInterface } from "../types";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const NavBar = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logout = () => {
        const handleLogout = async () => {
            try {
                await auth.signOut();
                console.log("User logged out");
                setFirebaseAuth(null);
                window.localStorage.removeItem("userData");
                queryClient.clear();
                navigate("/");
            } catch (error) {
                console.error("Error logging out", error);
            }
        };
        handleLogout();
    };

    if (userStatus === "pending") {
        return (
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        Notes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Notes
                </Link>
            </div>
            {user ? (
                <div className="flex-none">
                    <Link to="/notes/add/">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            +
                        </label>
                    </Link>
                    <label className="" htmlFor="">
                        {user.name}
                    </label>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex-none">
                    <Link to="/login" className="btn btn-ghost">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-ghost">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
