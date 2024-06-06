import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useUser from "../../hooks/useUser";
import { FireBaseUserInterface } from "../../types";
import userService from "../../services/user";
import EditProfile from "./EditProfile";
import ErrorPage from "../ErrorPage";
import { useTranslation } from "react-i18next";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const ProfilePage = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const { t } = useTranslation();
    const { data: user, status: userStatus } = useUser(firebaseAuth);

    const navigate = useNavigate();

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

    document.title = t("profile") + " | " + t("notes");

    const deleteAccount = async () => {
        // double check
        const confirmDelete = window.confirm(t("deleteAccountWarning"));
        if (!confirmDelete) return;
        // delete account
        try {
            await userService.remove(firebaseAuth.uid);
            setFirebaseAuth(null);
            toast.success(t("accountDeletedSuccessfully") + " " + t("accountDeletedGoodbye"));
            navigate("/");
        } catch (error) {
            toast.error(t("errorDeletingAccount"));
        }
    };

    const handleModalOpen = () => {
        // Open the modal using document.getElementById('ID').showModal() method
        const modal = document.getElementById("editNameModal");
        if (modal) {
            const modalElement = document.getElementById("editNameModal") as HTMLDialogElement;
            modalElement.showModal();
        }
    };

    return (
        <div>
            <div className="m-auto max-w-3xl">
                <dialog id="editNameModal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{t("changeYourName")}</h3>
                        <EditProfile firebaseAuth={firebaseAuth} user={user} />
                    </div>
                </dialog>
                <div className="m-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex flex-col items-center pb-10">
                        {/* api doesn't collect any data */}
                        <img
                            className="w-24 h-24 mb-3 rounded-full mt-10"
                            src={`https://ui-avatars.com/api/?background=ed58a0&color=fff&name=${user.name}`}
                            alt="user avatar"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{user.name}</h5>
                        <span className="text-sm text-gray-500">{firebaseAuth.email}</span>
                        {firebaseAuth.metadata?.creationTime && (
                            <span className="text-sm text-gray-500 mt-5">
                                {t("accountCreatedAt")}:{" "}
                                {new Date(firebaseAuth.metadata.creationTime).toLocaleString()}
                            </span>
                        )}
                        {firebaseAuth.metadata?.lastSignInTime && (
                            <span className="text-sm text-gray-500">
                                {t("lastSignedIn")}:{" "}
                                {new Date(firebaseAuth.metadata.lastSignInTime).toLocaleString()}
                            </span>
                        )}

                        <div className="flex mt-4 md:mt-6">
                            <button
                                type="button"
                                id="editNameButton"
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={handleModalOpen}
                            >
                                {t("editName")}
                            </button>

                            <button
                                type="button"
                                id="deleteAccountButton"
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={deleteAccount}
                            >
                                {t("deleteAccount")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <EditProfile /> */}
        </div>
    );
};

export default ProfilePage;
