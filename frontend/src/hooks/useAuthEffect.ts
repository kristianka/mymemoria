import { useEffect } from "react";
import { auth } from "../firebase";
import notesService from "../services/notes";
import userService from "../services/user";
import { FireBaseUserInterface } from "../types";
import { toast } from "react-toastify";

const useAuthEffect = (
    setFirebaseAuth: React.Dispatch<React.SetStateAction<FireBaseUserInterface | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const firebaseObject: FireBaseUserInterface = {
                    email: authUser.email,
                    uid: authUser.uid,
                    emailVerified: authUser.emailVerified,
                    metadata: authUser.metadata
                };
                authUser
                    .getIdToken()
                    .then((token) => {
                        userService.setToken(token);
                        notesService.setToken(token);
                        setFirebaseAuth(firebaseObject);
                    })
                    .catch((error: Error) => {
                        if (error.message.includes("auth/id-token-expired")) {
                            toast.error("Your session has expired. Please log in again.");
                        } else {
                            toast.error("An error occurred. Please try again.");
                        }
                        setFirebaseAuth(null);
                    });
            } else {
                // User is signed out
                setFirebaseAuth(null);
            }
            setLoading(false);
        });

        // Cleanup the observer when the component unmounts
        return () => unsubscribe();
    }, [setFirebaseAuth, setLoading]);
};

export default useAuthEffect;
