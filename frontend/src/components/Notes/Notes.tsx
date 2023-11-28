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
            <div className="grid grid-cols-2 divide-x">
                <div className="">
                    <div className="grid grid-cols-1 divide-y">
                        {notes?.map((note: NoteInterface) => (
                            <div key={note.id} className="rounded-lg">
                                <li className="collapse collapse-arrow border" key={note.id}>
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl font-medium">
                                        {note.title}
                                    </div>
                                    <div className="collapse-content">{note.content} </div>
                                </li>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rounded-lg">
                    <Map user={user}></Map>
                </div>
            </div>
        </div>
    );
};

export default Notes;
