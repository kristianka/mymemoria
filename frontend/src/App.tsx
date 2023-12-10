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

import { LoggedInUser } from "./types";
import AddNote from "./components/Notes/AddNote";
import Notification from "./components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
    // to reduce the flashing when refreshing page
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<unknown | null>(null);
    const [notificationContent, setNotificationContent] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<string | null>(null);

    // useEffect(() => {
    //     console.log("App useEffect");
    //     const savedUser = window.localStorage.getItem("LoggedUser");
    //     if (savedUser) {
    //         const expiresAtString = JSON.parse(savedUser).expiresAt;
    //         const expiresAt = new Date(expiresAtString);
    //         if (expiresAt < new Date()) {
    //             console.log("token expired");
    //             window.localStorage.removeItem("LoggedUser");
    //             setUser(null);
    //             setLoading(false);
    //             setNotificationContent("You have been logged out due to inactivity.");
    //             setNotificationType("error");
    //             setTimeout(() => {
    //                 setNotificationContent(null);
    //                 setNotificationType(null);
    //             }, 10000);
    //             return;
    //         }
    //         notesService.setToken(JSON.parse(savedUser).token);
    //         setUser(JSON.parse(savedUser));
    //     }
    //     setLoading(false);
    // }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user", user);
                setUser(user);
            } else {
                console.log("user is logged out");
            }
        });
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    console.log("user", user);

    return (
        <div>
            <AnnouncementBanner></AnnouncementBanner>
            <NavBar user={user} setUser={setUser}></NavBar>
            <div className="notification">
                <Notification content={notificationContent} type={notificationType}></Notification>
            </div>
            <Routes>
                {user ? (
                    <Route path="/" element={<Notes user={user} />} />
                ) : (
                    <Route path="/" element={<LandingPage />} />
                )}
                <Route
                    path="/login"
                    element={
                        <LoginPage
                            user={user}
                            setUser={setUser}
                            setNotificationContent={setNotificationContent}
                            setNotificationType={setNotificationType}
                        />
                    }
                />
                <Route path="/notes" element={<Notes user={user} />} />
                <Route
                    path="/notes/:id"
                    element={
                        <SingleNote
                            user={user}
                            setNotificationContent={setNotificationContent}
                            setNotificationType={setNotificationType}
                        />
                    }
                ></Route>
                <Route path="/notes/add" element={<AddNote user={user}></AddNote>}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/settings" element={<SettingsPage />}></Route>
                <Route
                    path="/register"
                    element={<RegisterPage user={user} setUser={setUser} />}
                ></Route>
            </Routes>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default App;
