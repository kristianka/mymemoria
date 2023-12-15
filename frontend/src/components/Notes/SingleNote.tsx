import { FireBaseUserInterface, NoteInterface } from "../../types";
import useNotes from "../../hooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const SingleNote = ({ firebaseAuth }: props) => {
    const { id } = useParams();
    const { data: user } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user || null);
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

    document.title = `${note.title} | Notes`;
    return (
        <div>
            <p>delete note:</p> <button>delete</button>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.user}</p>
            <h1>Logged in as {user?.name}</h1>
            <h1>Single Note</h1>
        </div>
    );
};

export default SingleNote;
