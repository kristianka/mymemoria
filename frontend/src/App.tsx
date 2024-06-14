import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./i18n/config";
import NavBar from "./components/NavBarPages/NavBar";
import Footer from "./components/Footer/Footer";

import LandingPage from "./components/Frontpage/LandingPage";
import LoginPage from "./components/Frontpage/LoginPage";
import RegisterPage from "./components/Frontpage/RegisterPage";
import SettingsPage from "./components/NavBarPages/SettingsPage";
import ProfilePage from "./components/NavBarPages/ProfilePage";
import SingleNote from "./components/Notes/SingleNotePage";

import Notes from "./components/Notes/Notes";

import AddNote from "./components/Notes/AddNote";

import { FireBaseUserInterface } from "./types";
import useAuthEffect from "./hooks/useAuthEffect";
import EditNote from "./components/Notes/EditNote";
import NotFound from "./components/NotFound";
import InfoPage from "./components/Footer/InfoPage";
import Timeline from "./components/Timeline/Timeline";
import CookiePopUp from "./components/CookiePopUp";

const App = () => {
    const [firebaseAuth, setFirebaseAuth] = useState<FireBaseUserInterface | null>(null);
    // avoids flickering landing page
    const [loading, setLoading] = useState<boolean>(true);
    // auth hook
    useAuthEffect(setFirebaseAuth, setLoading);

    if (loading) {
        return (
            <div>
                <NavBar firebaseAuth={firebaseAuth} setFirebaseAuth={setFirebaseAuth}></NavBar>
                <div className="flex flex-col min-h-screen bg-slate-50"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
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
                <Route path="/notes/:id" element={<SingleNote firebaseAuth={firebaseAuth} />} />
                <Route
                    path="/notes/:id/edit"
                    element={<EditNote firebaseAuth={firebaseAuth}></EditNote>}
                />
                <Route
                    path="/notes/add"
                    element={<AddNote firebaseAuth={firebaseAuth}></AddNote>}
                />
                <Route
                    path="/notes/timeline"
                    element={<Timeline firebaseAuth={firebaseAuth} />}
                ></Route>
                <Route
                    path="/profile"
                    element={
                        <ProfilePage
                            firebaseAuth={firebaseAuth}
                            setFirebaseAuth={setFirebaseAuth}
                        />
                    }
                />
                <Route path="/settings" element={<SettingsPage firebaseAuth={firebaseAuth} />} />
                <Route path="/register" element={<RegisterPage firebaseAuth={firebaseAuth} />} />
                <Route path="/info" element={<InfoPage />} />
                {/* 404 for any other route */}
                {/* unknown or unauthorized note will show to 404 from component */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <CookiePopUp />
            <Footer />
        </div>
    );
};

export default App;
