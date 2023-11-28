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

import Notes from "./components/Notes/Notes";

import notesService from "./services/notes";

import { LoggedInUser } from "./types";
import AddNote from "./components/Notes/AddNote";

const App = () => {
    // to reduce the flashing when refreshing page
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        console.log("App useEffect");
        const savedUser = window.localStorage.getItem("LoggedUser");
        if (savedUser) {
            notesService.setToken(JSON.parse(savedUser).token);
            setUser(JSON.parse(savedUser));
        }
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
            <Routes>
                {user ? (
                    <Route path="/" element={<Notes user={user} />} />
                ) : (
                    <Route path="/" element={<LandingPage />} />
                )}
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
                <Route path="/notes" element={<Notes user={user} />} />
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
