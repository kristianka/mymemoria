import { FireBaseUserInterface, NoteInterface } from "../../types";
import useNotes from "../../hooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon, InboxArrowDownIcon } from "@heroicons/react/20/solid";
import NotFound from "../NotFound";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";
import notesService from "../../services/notes";
import { useQueryClient } from "@tanstack/react-query";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import SingleNoteMap from "./SingleNoteMap";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const SingleNote = ({ firebaseAuth }: props) => {
    const { id } = useParams();
    const { data: user } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (notesStatus === "error") {
        toast.error("Error getting notes, please try again later.");
        return <div>Something went wrong, please try again later</div>;
    }

    const note: NoteInterface | undefined = notes?.find((note) => note.id === id);
    if (!note) {
        return <NotFound></NotFound>;
    }

    const deleteNote = async () => {
        try {
            // double check
            const confirmDelete = window.confirm("Are you sure you want to delete this note?");
            if (!confirmDelete) return;
            const res = await notesService.remove(note.id);
            if (!res) {
                toast.error("Error deleting note, please try again later.");
                return;
            }
            // invalidate notes
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note deleted successfully");
            navigate("/notes");
        } catch (error) {
            toast.error("Error deleting note, please try again later.");
        }
    };

    const editNote = () => {
        navigate(`/notes/${note.id}/edit`);
        console.log("edit note");
    };

    document.title = `${note.title} | Notes`;
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1">
                <div className="m-3">
                    <div key={note.id} className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-3xl">{note.title}</h2>
                            <p className="trunacte text-ellipsis text-xl whitespace-pre-line">
                                {note.content}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 rounded-lg md:order-1 m-3">
                    {firebaseAuth && notesStatus !== "success" && <MapLoadingSkeleton />}
                    {note.location.coordinates[0] !== 0 && note.location.coordinates[1] !== 0 && (
                        <SingleNoteMap note={note} />
                    )}
                    <div className="grid grid-cols-2 mt-5">
                        <div className="">
                            <button
                                type="button"
                                onClick={editNote}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Edit note
                            </button>
                            <button
                                type="button"
                                onClick={deleteNote}
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Delete note
                            </button>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="tooltip" data-tip="Created at">
                                <InboxArrowDownIcon className="m-auto h-7 w-7 text-blue-500" />
                                <p>{new Date(note.createdAt).toLocaleString()} </p>
                            </div>
                            {note?.modifiedAt && (
                                <div className="tooltip" data-tip="Last modified at">
                                    <PencilSquareIcon className="m-auto h-7 w-7 text-blue-500" />
                                    <p>{new Date(note?.modifiedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
