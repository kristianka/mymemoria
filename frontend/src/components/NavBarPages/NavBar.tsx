import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { auth } from "../../firebase";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface } from "../../types";
import { changeLanguage } from "../../misc";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const NavBar = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const { t } = useTranslation();
    const { data: user } = useUser(firebaseAuth);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logout = () => {
        const handleLogout = async () => {
            try {
                await auth.signOut();
                setFirebaseAuth(null);
                queryClient.clear();
                navigate("/");
                toast.success("Logged out successfully. 👋");
            } catch (error) {
                console.error(error);
                toast.success("Error while logging out. Please try again later.");
            }
        };
        handleLogout();
    };

    // loading skeleton
    if (firebaseAuth && !user) {
        return (
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        {t("notes")}
                    </Link>
                </div>
                <div className="flex-none">
                    <label className="" htmlFor="">
                        <div className="flex animate-pulse">
                            <div className="ms-2 mt-0 w-full">
                                <h3 className="bg-gray-100 rounded-full dark:bg-gray-300 w-40 h-6"></h3>
                            </div>
                        </div>
                    </label>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <div className="flex animate-pulse">
                                    <div className="flex-shrink-0">
                                        <span className="w-12 h-12 block bg-gray-100 rounded-full dark:bg-gray-300"></span>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    {t("notes")}
                </Link>
            </div>
            <button className="mr-3 rounded-md bg-gray-100 p-3" onClick={changeLanguage}>
                {t("changeLanguage")}
            </button>

            {/* user is logged in */}
            {user ? (
                <div className="flex-none">
                    <Link id="addNoteButton" to="/notes/add/">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            +
                        </label>
                    </Link>
                    <label className="" htmlFor="">
                        {user.name}
                    </label>
                    <div id="dropdownMenu" className="userAvatar dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/* api doesn't collect any data */}
                                <img
                                    src={`https://ui-avatars.com/api/?background=ed58a0&color=fff&name=${user.name}`}
                                    alt="user avatar"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {" "}
                            <li className="">
                                <Link to="/notes" className="py-2">
                                    {t("yourNotes")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes/add" className="py-2">
                                    {t("newNote")}
                                </Link>
                            </li>
                            <li className="border-t border-gray-200 profileButton">
                                <Link to="/profile" className="py-2 justify-between">
                                    {t("profile")}
                                </Link>
                            </li>
                            <li className="settingsButton">
                                <Link to="/settings" className="py-2 justify-between">
                                    {t("settings")}
                                </Link>
                            </li>
                            <li className="border-t border-gray-200 logoutButton">
                                <Link to="/" className="py-2" onClick={logout}>
                                    {t("signOut")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                // user isn't logged in
                <div className="flex-none">
                    <Link to="/login" className="loginButton btn btn-ghost">
                        {t("signIn")}
                    </Link>
                    <Link to="/register" className="registerButton btn btn-ghost">
                        {t("createAccount")}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
