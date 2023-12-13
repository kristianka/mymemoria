import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import AnnouncementBanner from "./components/AnnouncementBanner";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer/Footer";

import LandingPage from "./components/Frontpage/LandingPage";
import LoginPage from "./components/Frontpage/LoginPage";
import RegisterPage from "./components/Frontpage/RegisterPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";
import SingleNote from "./components/Notes/SingleNote";

import Notes from "./components/Notes/Notes";

import notesService from "./services/notes";
import userService from "./services/user";
import infoService from "./services/info";

import AddNote from "./components/Notes/AddNote";
import { auth } from "./firebase";

import useUser from "./hooks/useUser";
import { toast } from "react-toastify";

const App = () => {
    const [firebaseAuth, setFirebaseAuth] = useState<object | null>(null);

    // user hook
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    console.log("user", user);
    console.log("fb", firebaseAuth);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in, only get these values
                // checks server health and displays a toast if server is down
                infoService.serverHealthCheck();

                setFirebaseAuth(authUser);
                authUser
                    .getIdToken()
                    .then((token) => {
                        notesService.setToken(token);
                        userService.setToken(token);
                    })
                    .catch((error) => {
                        console.error("Error getting Firebase ID token:", error);
                    });
            } else {
                // User is signed out
                setFirebaseAuth(null);
                // remove fetched user data (usernames, etc.) from local storage
                localStorage.removeItem("userData");
            }
        });

        // Cleanup the observer when the component unmounts
        return () => unsubscribe();
    }, []);

    console.log(user);

    if (firebaseAuth && userStatus === "pending") {
        return (
            <div>
                <AnnouncementBanner></AnnouncementBanner>
                <NavBar firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth}></NavBar>
                <span className="loading loading-spinner loading-md"></span>
                <p>loading</p>
            </div>
        );
    }

    if (firebaseAuth && userStatus === "error") {
        toast.error("Error connecting to server. Please try again later.");
    }

    console.log("in app");
    return (
        <div>
            <AnnouncementBanner></AnnouncementBanner>
            <NavBar firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth}></NavBar>
            <Routes>
                {user && firebaseAuth ? (
                    <Route path="/" element={<Notes firebaseAuth={firebaseAuth} />} />
                ) : (
                    <Route path="/" element={<LandingPage />} />
                )}
                <Route
                    path="/login"
                    element={
                        <LoginPage firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth} />
                    }
                />
                <Route path="/notes" element={<Notes firebaseAuth={firebaseAuth} />} />
                <Route
                    path="/notes/:id"
                    element={<SingleNote firebaseAuth={firebaseAuth} />}
                ></Route>
                <Route path="/notes/add" element={<AddNote user={user}></AddNote>}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/settings" element={<SettingsPage />}></Route>
                <Route
                    path="/register"
                    element={<RegisterPage firebaseAuth={firebaseAuth} />}
                ></Route>
            </Routes>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default App;
