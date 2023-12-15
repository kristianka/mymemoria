import { useState } from "react";
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

import AddNote from "./components/Notes/AddNote";

import { FireBaseUserInterface } from "./types";
import useAuthEffect from "./hooks/useAuthEffect";

const App = () => {
    const [firebaseAuth, setFirebaseAuth] = useState<FireBaseUserInterface | null>(null);
    // avoids flickering landing page
    const [loading, setLoading] = useState<boolean>(true);
    // auth hook
    useAuthEffect(setFirebaseAuth, setLoading);

    if (loading) {
        return (
            <div>
                <AnnouncementBanner></AnnouncementBanner>
                <NavBar firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth}></NavBar>
            </div>
        );
    }

    return (
        <div>
            <AnnouncementBanner></AnnouncementBanner>
            <NavBar firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth}></NavBar>
            <Routes>
                {firebaseAuth && !loading ? (
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
                <Route
                    path="/notes/add"
                    element={<AddNote firebaseAuth={firebaseAuth}></AddNote>}
                ></Route>
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
