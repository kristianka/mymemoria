import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import userService from "../../services/user";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface, UpdateUserInterface } from "../../types";
import SettingsMap from "./SettingsMap";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const SettingsPage = ({ firebaseAuth }: props) => {
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    // if user is not logged in, redirect to front page
    // useEffect to prevent infinite loop if server is down
    useEffect(() => {
        if (!user && userStatus !== "pending") {
            navigate("/");
        }
    }, [user, userStatus, navigate]);

    useEffect(() => {
        if (user) {
            setLat(user.defaultLocation.coordinates[1]);
            setLng(user.defaultLocation.coordinates[0]);
        }
        if (firebaseAuth && !user) {
            navigate("/");
        }
    }, [firebaseAuth, navigate, user]);

    if (firebaseAuth && !user) {
        return <p>Loading...</p>;
    }

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!lat || !lng) {
                toast.error("Please select a location");
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
            toast.success("Default map location updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Error updating default map location, please try again later.");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 m-3">
                <div className="md:m-10">
                    <h1 className="text-center normal-case text-2xl">Settings</h1>
                    <p className="mt-5 text-center text-gray-500">
                        You can change your default map location when creating note here.
                    </p>
                    <p className="mt-1 text-center text-gray-500">
                        You can change your name or delete your account in{" "}
                        <Link to="/profile" className="text-blue-500">
                            profile.
                        </Link>
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-5"
                    >
                        Location
                    </label>
                    <SettingsMap setLat={setLat} setLng={setLng} user={user} />
                    <button
                        onClick={submit}
                        type="submit"
                        id="saveNoteButton"
                        className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                    >
                        Save location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
