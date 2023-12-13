import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import notesService from "../services/notes";

interface AuthContextType {
    user: {
        uid: string;
        displayName: string;
        email: string;
    } | null;
}

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAuthContext = () => {
    const [user, setUser] = useState(<AuthContextType | null>null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in, only get these values
                authUser
                    .getIdToken()
                    .then((token) => {
                        notesService.setToken(token);
                    })
                    .catch((error) => {
                        console.error("Error getting Firebase ID token:", error);
                    });
                setLoading(false);
            } else {
                // User is signed out
                setUser(null);
                setLoading(false);
            }
        });

        // Cleanup the observer when the component unmounts
        return () => unsubscribe();
    }, []);

    return [user, setUser, loading];
};
