import Map from "../Map";
import useNotes from "../../hooks/useNotes";
import { FireBaseUserInterface, NoteInterface } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Notes = ({ firebaseAuth }: props) => {
    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const navigate = useNavigate();

    // if user is not logged in, redirect to front page
    if (!user && userStatus !== "pending") {
        navigate("/");
    }

    document.title = "Your notes | Notes";

    if (firebaseAuth && notesStatus === "pending") {
        return (
            <div className="grid grid-cols-2 divide-x">
                <div className="grid grid-cols-1 divide-y">
                    <div className="rounded-lg">
                        <div className="flex animate-pulse">
                            <li className="collapse collapse-arrow border bg-gray-100 rounded-md dark:bg-gray-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl"></div>
                                <div className="collapse-content"></div>
                            </li>
                        </div>
                    </div>
                    <div className="rounded-lg">
                        <div className="flex animate-pulse">
                            <li className="collapse collapse-arrow border bg-gray-100 rounded-md dark:bg-gray-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl"></div>
                                <div className="collapse-content"></div>
                            </li>
                        </div>
                    </div>

                    <div className="rounded-lg">
                        <div className="flex animate-pulse">
                            <li className="collapse collapse-arrow border bg-gray-100 rounded-md dark:bg-gray-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl"></div>
                                <div className="collapse-content"></div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (notesStatus === "error") {
        toast.error("Error getting notes, please try again later.");
        return <div>Something went, please try again later</div>;
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
                    <Map firebaseAuth={firebaseAuth}></Map>
                </div>
            </div>
        </div>
    );
};

export default Notes;
