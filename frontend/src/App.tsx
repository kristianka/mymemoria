import { useState, useEffect } from "react";
import { Note } from "./types";
import { AxiosResponse } from "axios";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./components/LandingPage";
import AnnouncementBanner from "./components/AnnouncementBanner";
import LoginPage from "./components/Login/LoginPage";
import Notes from "./components/Notes/Notes";

import notesService from "./services/notes";

const App = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        notesService.getAll().then((response: AxiosResponse<Note[]>) => {
            setNotes(response.data);
        });
    }, []);

    console.log(notes);

    return (
        <div>
            <AnnouncementBanner></AnnouncementBanner>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage name="testi" />} />
                <Route path="/notes" element={<Notes notes={notes} />}></Route>
            </Routes>
        </div>
    );
};

export default App;
