import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { auth } from "../../firebase";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface } from "../../types";
import ChangeLanguageDropdown from "./ChangeLanguage";

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
                toast.success(`${t("loggedOutSuccessfully")} 👋`);
            } catch (error) {
                console.error(error);
                toast.success(t("loggedOutError"));
            }
        };
        handleLogout();
    };

    // loading skeleton
    if (firebaseAuth && !user) {
        return (
            <div className="navbar bg-base-100 overflow-x-auto">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case rounded-md text-xl">
                        {t("appName")}
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
            <div className="flex sm:flex-1 w-full">
                <Link to="/" className="btn btn-ghost normal-case rounded-md text-xl">
                    {t("appName")}
                </Link>
            </div>
            {/* user is logged in */}
            {user ? (
                <div className="flex-none">
                    <div className="overflow-x-auto">
                        <div className="flex">
                            <Link id="addNoteButton" to="/notes/add/">
                                <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
                                    +
                                </label>
                            </Link>
                            <Link to="/notes/timeline">
                                <label className="m-1 btn-circle btn btn-ghost" htmlFor="">
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.2496718,13 C16.2161701,13 16.9996718,13.7835017 16.9996718,14.75 L16.9996718,19.25 C16.9996718,20.2164983 16.2161701,21 15.2496718,21 L3.74967178,21 C2.78317347,21 1.99967178,20.2164983 1.99967178,19.25 L1.99967178,14.75 C1.99967178,13.7835017 2.78317347,13 3.74967178,13 L15.2496718,13 Z M20.9999472,14.8988691 L20.9996863,20.25 C20.9996863,20.6642136 20.6638999,21 20.2496863,21 C19.8699905,21 19.5561953,20.7178461 19.5065329,20.3517706 L19.4996863,20.25 L19.499308,14.9117103 C19.7315928,14.9693895 19.9745687,15 20.2246942,15 C20.4927784,15 20.7526497,14.9648361 20.9999472,14.8988691 Z M15.2496718,14.5 L3.74967178,14.5 C3.6116006,14.5 3.49967178,14.6119288 3.49967178,14.75 L3.49967178,19.25 C3.49967178,19.3880712 3.6116006,19.5 3.74967178,19.5 L15.2496718,19.5 C15.387743,19.5 15.4996718,19.3880712 15.4996718,19.25 L15.4996718,14.75 C15.4996718,14.6119288 15.387743,14.5 15.2496718,14.5 Z M20.2494639,10.0919271 C21.3032635,10.0919271 22.1575368,10.9462004 22.1575368,12 C22.1575368,13.0537996 21.3032635,13.9080729 20.2494639,13.9080729 C19.1956643,13.9080729 18.341391,13.0537996 18.341391,12 C18.341391,10.9462004 19.1956643,10.0919271 20.2494639,10.0919271 Z M15.2452829,3 C16.2117813,3 16.9952829,3.78350169 16.9952829,4.75 L16.9952829,9.25 C16.9952829,10.2164983 16.2117813,11 15.2452829,11 L3.74528294,11 C2.77878463,11 1.99528294,10.2164983 1.99528294,9.25 L1.99528294,4.75 C1.99528294,3.8318266 2.70239322,3.07880766 3.60175573,3.0058012 L3.74528294,3 L15.2452829,3 Z M15.2452829,4.5 L3.74528294,4.5 L3.68796024,4.50660268 C3.57751636,4.53251318 3.49528294,4.63165327 3.49528294,4.75 L3.49528294,9.25 C3.49528294,9.38807119 3.60721176,9.5 3.74528294,9.5 L15.2452829,9.5 C15.3833541,9.5 15.4952829,9.38807119 15.4952829,9.25 L15.4952829,4.75 C15.4952829,4.61192881 15.3833541,4.5 15.2452829,4.5 Z M20.2496863,3 C20.6293821,3 20.9431773,3.28215388 20.9928397,3.64822944 L20.9996863,3.75 L20.9999472,9.10113095 C20.7526497,9.0351639 20.4927784,9 20.2246942,9 C19.9745687,9 19.7315928,9.03061049 19.499308,9.0882897 L19.4996863,3.75 C19.4996863,3.33578644 19.8354727,3 20.2496863,3 Z"
                                            id="🎨Color"
                                        />
                                    </svg>
                                </label>
                            </Link>
                            <Link className="hidden sm:block" to="/profile">
                                <label className="m-1 rounded-md btn btn-ghost" htmlFor="">
                                    {user.name}
                                </label>
                            </Link>
                        </div>
                    </div>
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
                            className="menu menu-sm dropdown-content mt-1 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <span className="m-3 font-medium">{user.name}</span>
                            <li className="border-t">
                                <Link to="/notes" className=" rounded-md py-2">
                                    {t("yourNotes")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes/add" className="rounded-md py-2">
                                    {t("newNote")}
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes/timeline" className="rounded-md py-2">
                                    {t("timeline")}
                                </Link>
                            </li>
                            <li className="border-t border-gray-200 profileButton">
                                <Link to="/profile" className="rounded-md py-2 justify-between">
                                    {t("profile")}
                                </Link>
                            </li>
                            <li className="settingsButton">
                                <Link to="/settings" className="rounded-md py-2 justify-between">
                                    {t("settings")}
                                </Link>
                            </li>
                            <li className="border-t border-gray-200 logoutButton">
                                <Link to="/" className="rounded-md py-2" onClick={logout}>
                                    {t("signOut")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <>
                    <ChangeLanguageDropdown />
                    {/* // user isn't logged in */}
                    <div className="flex overflow-x-auto">
                        {/* when signed in, language setting is in settings */}
                        <Link to="/login" className="m-1 rounded-md loginButton btn btn-ghost">
                            {t("signIn")}
                        </Link>
                        <Link
                            to="/register"
                            className="m-1 rounded-md registerButton btn btn-ghost"
                        >
                            {t("createAnAccount")}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default NavBar;
