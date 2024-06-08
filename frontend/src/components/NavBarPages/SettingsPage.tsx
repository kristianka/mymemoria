import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import userService from "../../services/user";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface, UpdateUserInterface } from "../../types";
import SettingsMap from "./SettingsMap";
import ErrorPage from "../ErrorPage";
import { useTranslation } from "react-i18next";
import ChangeLanguageDropdown from "./ChangeLanguage";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const SettingsPage = ({ firebaseAuth }: props) => {
    const { t } = useTranslation();
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    // if user is not logged in, redirect to front page
    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    if (userStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (userStatus === "error" || !user || !firebaseAuth) {
        toast.error(t("errorGettingUserInfo"));
        return <ErrorPage />;
    }

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!lat || !lng) {
                toast.error(t("pleaseSelectLocation"));
                return;
            }

            const updatedUser = {
                id: firebaseAuth?.uid,
                name: user?.name,
                defaultLocation: {
                    coordinates: [lng, lat]
                }
            } as UpdateUserInterface;
            await userService.update(updatedUser);
            // invalidate user
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success(t("defaultMapLocationUpdated"));
        } catch (error) {
            console.error(error);
            toast.error(t("defaultMapLocationUpdateError"));
        }
    };

    const cancelChanges = () => {
        const confirmCancel = window.confirm(t("defaultMapLocationCancelWarning"));
        if (!confirmCancel) return;
        setLat(0);
        setLng(0);
        navigate("/notes");
    };

    document.title = t("settings") + " | " + t("appName");

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 m-3">
                <div className="md:m-10">
                    <h1 className="text-center normal-case text-2xl">{t("settings")}</h1>
                    <p className="mt-5 text-center text-gray-500">{t("settingsPageInfo")}</p>
                    <p className="mt-3 text-center text-gray-500">
                        {t("settingsPageInfo2")}{" "}
                        <Link to="/profile" className="text-blue-500">
                            {t("settingsPageInfo3")}
                        </Link>
                    </p>
                    <div className="text-center m-5">
                        <ChangeLanguageDropdown />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-5"
                    >
                        {t("defaultLocation")}
                    </label>
                    <SettingsMap setLat={setLat} setLng={setLng} user={user} />
                    <div className="grid grid-cols-2">
                        <div className="mr-5">
                            <button
                                onClick={cancelChanges}
                                id="cancelChangesButton"
                                className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                {t("cancel")}
                            </button>
                        </div>
                        <div className="ml-5">
                            <button
                                onClick={submit}
                                type="submit"
                                id="saveLocationButton"
                                className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                {t("save")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
