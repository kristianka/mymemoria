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
    if (notesStatus === "error") {
        toast.error("Error getting notes, please try again later.");
        return <div>Something went, please try again later</div>;
    }
    return (
        <div>
            <h1>There are {notes?.length} note(s)</h1>
            <div className="grid grid-cols-2 divide-x">
                <div className="grid grid-cols-1 divide-y">
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
                <div className="grid grid-cols-1 divide-y rounded-lg">
                    {firebaseAuth && notesStatus === "pending" && <MapLoadingSkeleton />}
                    {notes && notes.length !== 0 && <Map firebaseAuth={firebaseAuth}></Map>}
                </div>
            </div>
        </div>
    );
};

export default Notes;
