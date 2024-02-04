import { Link } from "react-router-dom";
import { ChevronRightIcon, InboxArrowDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { NoteInterface } from "../../types";

interface props {
    note: NoteInterface;
}

const NoteCard = ({ note }: props) => {
    return (
        <div className="card bg-base-100">
            <Link id={`toNoteButton=${note.id}`} to={`/notes/${note.id}`}>
                <div className="card-body">
                    <h2 className="card-title truncate">{note.title}</h2>
                    <p className="line-clamp-3 overflow-hidden trunacte text-ellipsis whitespace-pre-line">
                        {note.content}
                    </p>

                    <div className="card-actions justify-end mt-3">
                        {note.modifiedAt ? (
                            <>
                                <PencilSquareIcon className="m-auto h-7 w-7 text-gray-500" />
                                <p
                                    className="m-auto text-gray-500 tooltip"
                                    data-tip="Last modified at"
                                >
                                    {new Date(note.modifiedAt).toLocaleString()}
                                </p>
                            </>
                        ) : (
                            <>
                                <InboxArrowDownIcon className="m-auto h-7 w-7 text-gray-500" />
                                <p className="m-auto text-gray-500 tooltip" data-tip="Created at">
                                    {new Date(note.createdAt).toLocaleString()}
                                </p>
                            </>
                        )}
                        <div className="tooltip" data-tip="Open note">
                            <ChevronRightIcon className="h-10 w-10 text-blue-500" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NoteCard;
