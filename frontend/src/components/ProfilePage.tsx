import { useEffect } from "react";
import useUser from "../hooks/useUser";
import { FireBaseUserInterface } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../services/user";
import EditProfile from "./EditProfile";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const ProfilePage = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const { data: user, status: userStatus } = useUser(firebaseAuth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    if (userStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (userStatus === "error" || !user || !firebaseAuth) {
        toast.error("Error getting user info, please try again later.");
        return <div>Something went wrong, please try again later</div>;
    }

    document.title = "Profile | Notes";

    const deleteAccount = async () => {
        // double check
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This cannot be undone and all notes will be lost!"
        );
        if (!confirmDelete) return;
        // delete account
        try {
            await userService.remove(user.id);
            setFirebaseAuth(null);
            toast.success("Account deleted successfully");
            navigate("/");
        } catch (error) {
            toast.error("Error deleting account, please try again later.");
        }
    };

    return (
        <div>
            <div className="m-auto">
                {/* api doesn't collect any data */}
                <img
                    className="avatar w-100 rounded-lg"
                    src={`https://ui-avatars.com/api/?background=ed58a0&color=fff&name=${user.name}`}
                    alt="user avatar"
                />
                <h2 className="text-xl">{user.name}</h2>
                <p className="text-l">{firebaseAuth.email}</p>
                {firebaseAuth.metadata?.creationTime && (
                    <p className="text-sm">
                        Account created at:{" "}
                        {new Date(firebaseAuth.metadata.creationTime).toLocaleString()}
                    </p>
                )}
                {firebaseAuth.metadata?.lastSignInTime && (
                    <p className="text-sm">
                        Last signed in:{" "}
                        {new Date(firebaseAuth.metadata.lastSignInTime).toLocaleString()}
                    </p>
                )}

                <p>Delete account</p>
                <button onClick={deleteAccount}>Delete</button>
            </div>
            <EditProfile />
        </div>
    );
};

export default ProfilePage;
