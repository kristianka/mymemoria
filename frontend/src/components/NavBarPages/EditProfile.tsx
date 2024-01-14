import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import userService from "../../services/user";
import { BackendUserInterface, FireBaseUserInterface } from "../../types";

interface props {
    user: BackendUserInterface;
    firebaseAuth: FireBaseUserInterface;
}

const EditProfile = ({ user, firebaseAuth }: props) => {
    const [name, setName] = useState(user.name);
    const queryClient = useQueryClient();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!name) {
                toast.error("Please fill in name");
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
            toast.success("Name updated successfully");
            // close modal
            const modal = document.getElementById("editNameModal");
            if (modal) {
                const modalElement = document.getElementById("editNameModal") as HTMLDialogElement;
                modalElement.close();
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating name, please try again later.");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 mt-5">
                <div className="md:m-10">
                    {/* <h1 className="text-center normal-case text-2xl">Edit name</h1> */}
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    name="name"
                                    type="text"
                                    required
                                    id="name"
                                    placeholder="Name"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button
                            onClick={submit}
                            type="submit"
                            id="saveNoteButton"
                            className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                        >
                            Update name
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
