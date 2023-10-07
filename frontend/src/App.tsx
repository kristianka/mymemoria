import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import AnnouncementBanner from "./components/AnnouncementBanner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";

import LandingPage from "./components/Frontpage/LandingPage";
import LoginPage from "./components/Frontpage/LoginPage";
import RegisterPage from "./components/Frontpage/RegisterPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";

import Notes from "./components/Notes/Notes";

import notesService from "./services/notes";

import { Note, UserInterface } from "./types";
import AddNote from "./components/Notes/AddNote";

const App = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [user, setUser] = useState<UserInterface>();
    // to reduce the flashing when refreshing page
    const [loading, setLoading] = useState<boolean>(true);

    // check if user is logged in
    useEffect(() => {
        const savedUser = window.localStorage.getItem("LoggedUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
            notesService.setToken(user.token);
        }
        setLoading(false);
        console.log("useEffect");
    }, []);

    // fetch notes when user is logged in
    useEffect(() => {
        if (user) {
            notesService.getAll().then((response: AxiosResponse<Note[]>) => {
                setNotes(response.data);
            });
        }
        console.log("useEffect2");
    }, [user]);

    console.log("notes", notes);
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
                <Route path="/notes/add" element={<AddNote></AddNote>}></Route>
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
