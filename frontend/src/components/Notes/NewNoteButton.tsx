import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

const NewNoteButton = () => {
    const navigate = useNavigate();

    const newNote = () => {
        navigate("/notes/add");
    };

    return (
        // can't use button, won't show where it will navigate in browser bottom left
        <div className="dropdown dropdown-start mt-3 ml-3">
            <Link to={"/notes/add"}>
                <label onClick={newNote} tabIndex={0} className="btn bg-base-100 rounded-lg">
                    <DocumentPlusIcon className="w-5 h-5" />
                    <p>New note</p>
                </label>
            </Link>
        </div>
    );
};

export default NewNoteButton;
