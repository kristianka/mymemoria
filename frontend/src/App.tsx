import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import AnnouncementBanner from "./components/AnnouncementBanner";
import NavBar from "./components/NavBar";

import LandingPage from "./components/Frontpage/LandingPage";
import LoginPage from "./components/Frontpage/LoginPage";
import RegisterPage from "./components/Frontpage/RegisterPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";

import Notes from "./components/Notes/Notes";

import notesService from "./services/notes";

import { Note, UserInterface } from "./types";

const App = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [user, setUser] = useState<UserInterface>();
    // to reduce the flashing when refreshing page
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // fetch *EVERY* note from the backend.
        // need to change this to only fetch the notes for the user.
        // needs to be also removed from backend
        notesService.getAll().then((response: AxiosResponse<Note[]>) => {
            setNotes(response.data);
        });
        const savedUser = window.localStorage.getItem("LoggedUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
        }
        setLoading(false);
    }, []);

    console.log(notes);
    console.log("user from app", user);

    if (loading) {
        return null;
    }

    return (
        <div>
            <AnnouncementBanner></AnnouncementBanner>
            <NavBar user={user} setUser={setUser}></NavBar>

            <Routes>
                {user ? (
                    <Route path="/" element={<Notes notes={notes} />} />
                ) : (
                    <Route path="/" element={<LandingPage />} />
                )}
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/settings" element={<SettingsPage />}></Route>
                <Route
                    path="/register"
                    element={<RegisterPage user={user} setUser={setUser} />}
                ></Route>
            </Routes>
        </div>
    );
};

export default App;
