import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { sortNotesByLastModified } from "./SortNotes/sortingNotes";
import useNotes from "../../hooks/useNotes";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface, NoteInterface } from "../../types";

import Map from "./Map";
import NotesLoadingSkeleton from "./NotesLoadingSkeleton";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import NoteCard from "./NoteCard";
import SortNotesDropdown from "./SortNotes/Dropdown";
import LoadingSkeleton from "./SortNotes/LoadingSkeleton";
import ErrorPage from "../ErrorPage";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Notes = ({ firebaseAuth }: props) => {
    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const [sortedNotes, setSortedNotes] = useState<NoteInterface[] | null>(null);
    const navigate = useNavigate();

    // if user is not logged in, redirect to front page
    // useEffect to prevent infinite loop if server is down
    useEffect(() => {
        if (!user && userStatus !== "pending") {
            navigate("/");
        }
    }, [user, userStatus, navigate]);

    useEffect(() => {
        // set notes from react query to state
        if (notes) {
            const sorted = sortNotesByLastModified(notes, "desc");
            setSortedNotes(sorted || null);
        }
        // reset sortedNotes if notesStatus changes to pending
        if (notesStatus === "pending") {
            setSortedNotes(null);
        }
    }, [notes, notesStatus]);
    document.title = "Your notes | Notes";

    console.log(notes);

    if (notesStatus === "error" || userStatus === "error") {
        toast.error("Error getting notes, please try again later.");
        return <ErrorPage />;
    }

    if (notesStatus === "success" && notes?.length === 0) {
        return (
            <div className="m-auto">
                <h1 className="text-center normal-case text-3xl">No notes yet</h1>
                <p className="text-center normal-case text-xl p-3">
                    Click the icon below to create your first note! ✏️
                </p>
                <div className="flex-1 text-center">
                    <Link to="/notes/add" className="btn btn-ghost rounded-lg">
                        <PencilSquareIcon className="w-10 h-10" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1">
                <div className="divide-y m-3">
                    <div className="pt-5 pb-5 bg-white">
                        <h1 className="text-center normal-case text-2xl">Your notes</h1>
                        <p className="text-center normal-case text-l">
                            You have {notes?.length} notes
                        </p>
                    </div>
                    {/* render three loading skeletons */}
                    {firebaseAuth &&
                        notesStatus === "pending" &&
                        [...Array(3)].map((_, i) => <NotesLoadingSkeleton key={i} />)}{" "}
                    {sortedNotes?.map((note: NoteInterface) => (
                        <NoteCard key={note.id} note={note}></NoteCard>
                    ))}
                </div>
                <div className="rounded-lg md:order-1 m-3">
                    {firebaseAuth && notesStatus === "pending" && (
                        <>
                            <MapLoadingSkeleton />
                            <LoadingSkeleton />
                        </>
                    )}
                    {notes && notes.length !== 0 && (
                        <>
                            <Map firebaseAuth={firebaseAuth} />
                            <SortNotesDropdown notes={notes} setSortedNotes={setSortedNotes} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
