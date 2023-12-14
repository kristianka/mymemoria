import { NoteInterface } from "../../types";
import useNotes from "../../hooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import useUser from "../../hooks/useUser";

interface props {
    firebaseAuth: object | null;
}

const SingleNote = ({ firebaseAuth }: props) => {
    const { id } = useParams();
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user);
    const navigate = useNavigate();

    if (!user) {
        // setNotificationContent("You need to be logged in to do that!");
        // setNotificationType("error");
        // setTimeout(() => {
        //     setNotificationContent(null);
        //     setNotificationType(null);
        // }, 10000);
        navigate("/");
    }

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (notesStatus === "error") {
        return <div>Something went wrong, please try again later</div>;
    }

    const note: NoteInterface = notes?.find((note) => note.id === id);
    console.log("note", note);

    console.log("notes in single note", notes);

    if (!note) {
        return <NotFound></NotFound>;
    }
    return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.location[0]}</p>
            <p>{note.location[1]}</p>
            <p>{note.user}</p>
            <h1>Logged in as {user?.name}</h1>
            <h1>Single Note</h1>
        </div>
    );
};

export default SingleNote;
