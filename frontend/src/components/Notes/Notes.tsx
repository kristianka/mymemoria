// import { Note } from "../../types";
import Map from "../Map";
import useNotes from "../../hooks/useNotes";
import { FireBaseUserInterface, NoteInterface } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useUser from "../../hooks/useUser";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Notes = ({ firebaseAuth }: props) => {
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user);
    const navigate = useNavigate();
    console.log("user in notes");
    if (!user && userStatus !== "pending") {
        navigate("/");
    }

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
                <div className="grid grid-cols-1 divide-y">
                    {notes &&
                        notes?.map((note: NoteInterface) => (
                            <div key={note.id} className="rounded-lg">
                                <li className="collapse collapse-arrow border" key={note.id}>
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl">{note.title}</div>
                                    <div className="collapse-content">
                                        {note.content}
                                        <Link to={`/notes/${note.id}`}>
                                            <ChevronRightIcon className="h-10 w-10 text-blue-500" />
                                        </Link>
                                    </div>
                                </li>
                            </div>
                        ))}
                </div>
                <div className="rounded-lg">
                    <Map user={user}></Map>
                </div>
            </div>
        </div>
    );
};

export default Notes;
