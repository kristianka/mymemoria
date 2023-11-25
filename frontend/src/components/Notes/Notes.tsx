import { Note } from "../../types";
import Map from "../Map";

interface props {
    notes: Note[];
}

const Notes = (props: props) => {
    const { notes } = props;

    return (
        <div>
            {notes.length === 0 ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : null}
            <h1>There are {notes.length} note(s)</h1>
            {notes.map((note) => (
                <li key={note.id}>
                    {note.title}: {note.content}
                </li>
            ))}
            <Map notes={notes}></Map>
        </div>
    );
};

export default Notes;
