import { Note } from "../../types";

interface props {
    notes: Note[];
}

const Notes = (props: props) => {
    const { notes } = props;

    return (
        <div>
            <h1>hello</h1>
            {notes.length === 0 ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : null}
            <h1>There are {notes.length} note(s)</h1>
            {notes.map((note) => (
                <li key={note.id}>
                    {note.title}: {note.content}
                </li>
            ))}
            <div className="flex justify-start ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
        </div>
    );
};

export default Notes;
