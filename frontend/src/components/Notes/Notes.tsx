// import { Note } from "../../types";
import Map from "../Map";
import useNotes from "../../hooks/useNotes";
import { LoggedInUser, NoteInterface } from "../../types";

interface props {
    user: LoggedInUser | null;
}

const Notes = ({ user }: props) => {
    const { data: notes, status: notesStatus } = useNotes(user);

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (notesStatus === "error") {
        return <div>Something went wrong, please try again later</div>;
    }
    return (
        <div>
            <h1>There are {notes?.length} note(s)</h1>
            {notes?.map((note: NoteInterface) => (
                <li key={note.id}>
                    {note.title}: {note.content}
                </li>
            ))}
            <Map user={user}></Map>
        </div>
    );
};

export default Notes;
