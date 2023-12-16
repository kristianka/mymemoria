import { FireBaseUserInterface, NoteInterface } from "../../types";
import useNotes from "../../hooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";
import notesService from "../../services/notes";
import { useQueryClient } from "@tanstack/react-query";

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
        console.log("deleted note");
    };

    const editNote = () => {
        navigate(`/notes/${note.id}/edit`);
        console.log("edit note");
    };

    document.title = `${note.title} | Notes`;
    return (
        <div>
            <div>
                <button onClick={editNote}>edit note</button>
                <br></br>
                <button onClick={deleteNote}>delete note</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.user}</p>
            <h1>Logged in as {user?.name}</h1>
            <h1>Single Note</h1>
        </div>
    );
};

export default SingleNote;
