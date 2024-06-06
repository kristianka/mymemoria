import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import userService from "../../services/user";
import { BackendUserInterface, FireBaseUserInterface } from "../../types";
import { useTranslation } from "react-i18next";

interface props {
    user: BackendUserInterface;
    firebaseAuth: FireBaseUserInterface;
}

const EditProfile = ({ user, firebaseAuth }: props) => {
    const { t } = useTranslation();
    const [name, setName] = useState(user.name);
    const queryClient = useQueryClient();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const editName = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!name) {
                toast.error(t("pleaseFillInName"));
                return;
            }
            const updatedUser = {
                id: firebaseAuth.uid,
                name: name,
                defaultLocation: user.defaultLocation
            };
            await userService.update(updatedUser);
            // invalidate user
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success(t("nameUpdatedSuccessfully"));
            // close modal
            const modal = document.getElementById("editNameModal");
            if (modal) {
                const modalElement = document.getElementById("editNameModal") as HTMLDialogElement;
                modalElement.close();
            }
        } catch (error) {
            console.log(error);
            toast.error(t("nameUpdateError"));
        }
    };

    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const modal = document.getElementById("editNameModal");
        if (modal) {
            const modalElement = document.getElementById("editNameModal") as HTMLDialogElement;
            modalElement.close();
        }
    };

    return (
        <div>
            <div className="mt-5">
                <div className="">
                    <form className="space-y-6" method="POST">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("name")}
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    name="name"
                                    type="text"
                                    required
                                    id="name"
                                    placeholder={t("name")}
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between modal-action mt-3">
                            <button
                                onClick={closeModal}
                                id="closeModalButton"
                                className="rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                {t("close")}
                            </button>
                            <button
                                onClick={editName}
                                type="submit"
                                id="updateNameButton"
                                className="rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                            >
                                {t("updateName")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
