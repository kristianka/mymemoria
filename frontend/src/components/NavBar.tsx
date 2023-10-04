import { Link } from "react-router-dom";
import { UserInterface } from "../types";

interface props {
    user: UserInterface | undefined;
    setUser: (user: UserInterface | undefined) => void;
}

const NavBar = (props: props) => {
    const logout = () => {
        window.localStorage.removeItem("LoggedUser");
        props.setUser(undefined);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Notes
                </Link>
            </div>
            {props.user ? (
                <div className="flex-none">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="add">+</div>
                    </label>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
                            </div>
                        </label>
                        <label className="" htmlFor="">
                            Username {props.user.name}
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
