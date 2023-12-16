import { useEffect } from "react";
import { auth } from "../firebase";
import notesService from "../services/notes";
import userService from "../services/user";
import infoService from "../services/info";
import { FireBaseUserInterface } from "../types";
import { toast } from "react-toastify";

const useAuthEffect = (
    setFirebaseAuth: React.Dispatch<React.SetStateAction<FireBaseUserInterface | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // checks server health and displays a toast if server is down
                infoService.serverHealthCheck();

                const ff: FireBaseUserInterface = {
                    email: authUser.email,
                    uid: authUser.uid,
                    emailVerified: authUser.emailVerified,
                    metadata: authUser.metadata
                };
                setFirebaseAuth(ff);
                authUser
                    .getIdToken()
                    .then((token) => {
                        notesService.setToken(token);
                        userService.setToken(token);
                    })
                    .catch((error) => {
                        if (error.message.includes("auth/id-token-expired")) {
                            toast.error("Your session has expired. Please log in again.");
                        } else {
                            toast.error("An error occurred. Please try again.");
                        }
                    });
            } else {
                // User is signed out
                setFirebaseAuth(null);
                // remove fetched user data (usernames, etc.) from local storage
                localStorage.removeItem("userData");
            }
            setLoading(false);
        });

        // Cleanup the observer when the component unmounts
        return () => unsubscribe();
    }, [setFirebaseAuth, setLoading]);
};

export default useAuthEffect;
