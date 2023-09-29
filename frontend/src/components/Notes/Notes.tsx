import { Note } from "../../types";

interface props {
    notes: Note[];
}

const Notes = (props: props) => {
    const { notes } = props;

    return (
        <div>
            <h1>There are {notes.length} note(s)</h1>
            {notes.length === 0 && <p>No notes to show</p>}
            {notes.map((note) => (
                <li key={note.id}>
                    {note.title}: {note.content}
                </li>
            ))}
        </div>
    );
};

export default Notes;
