import Map from "../Map";
import useNotes from "../../hooks/useNotes";
import { FireBaseUserInterface, NoteInterface } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import NotesLoadingSkeleton from "./NotesLoadingSkeleton";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import { useEffect } from "react";
import { auth } from "../../firebase";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Notes = ({ firebaseAuth }: props) => {
    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const navigate = useNavigate();

    // if user is not logged in, redirect to front page
    // useEffect to prevent infinite loop if server is down
    useEffect(() => {
        if (!user && userStatus !== "pending") {
            navigate("/");
        }
    }, [user, userStatus, navigate]);
    document.title = "Your notes | Notes";

    console.log(notes);
    if (notesStatus === "error" || userStatus === "error") {
        toast.error("Error getting notes, please try again later.");
        return (
            <div className="p-5">
                <h1 className="text-center normal-case text-2xl">
                    Sorry, something went wrong. Please try again later.
                </h1>
                <p className="text-center normal-case text-l p-3">You can try signing out:</p>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            auth.signOut();
                        }}
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="grid grid-cols-2 m-3">
                <div className="divide-y m-1">
                    <div className="pt-5 pb-5">
                        <h1 className="text-center normal-case text-2xl">Your notes</h1>
                        <p className="text-center normal-case text-l">
                            You have {notes?.length} notes
                        </p>
                    </div>
                    {firebaseAuth &&
                        notesStatus === "pending" &&
                        [...Array(3)].map((_, i) => <NotesLoadingSkeleton key={i} />)}{" "}
                    {notes &&
                        notes?.map((note: NoteInterface) => (
                            <div key={note.id} className="card bg-base-100">
                                <div className="card-body">
                                    <h2 className="card-title truncate">{note.title}</h2>
                                    <p className="trunacte text-ellipsis">{note.content}</p>
                                    <div className="card-actions justify-end">
                                        <Link
                                            id={`toNoteButton=${note.id}`}
                                            to={`/notes/${note.id}`}
                                        >
                                            <ChevronRightIcon className="h-10 w-10 text-blue-500" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="grid grid-cols-1 rounded-lg">
                    {firebaseAuth && notesStatus === "pending" && <MapLoadingSkeleton />}
                    {notes && notes.length !== 0 && <Map firebaseAuth={firebaseAuth}></Map>}
                </div>
            </div>
        </div>
    );
};

export default Notes;
