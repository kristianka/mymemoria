import { FireBaseUserInterface, NoteInterface } from "../../types";
import useNotes from "../../hooks/useNotes";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon, InboxArrowDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import NotFound from "../NotFound";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { toast } from "react-toastify";
import notesService from "../../services/notes";
import { useQueryClient } from "@tanstack/react-query";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import SingleNoteMap from "./SingleNoteMap";
import ErrorPage from "../ErrorPage";
import { useTranslation } from "react-i18next";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const SingleNote = ({ firebaseAuth }: props) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: user } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (notesStatus === "error") {
        toast.error(t("errorGettingNote"));
        return <ErrorPage />;
    }

    const note: NoteInterface | undefined = notes?.find((note) => note.id === id);
    if (!note) {
        return <NotFound></NotFound>;
    }

    const deleteNote = async () => {
        try {
            // double check
            const confirmDelete = window.confirm(t("deleteNoteWarning"));
            if (!confirmDelete) return;
            const res = await notesService.remove(note.id);
            if (!res) {
                toast.error(t("noteDeletedError"));
                return;
            }
            // invalidate notes
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success(t("noteDeletedSuccessfully"));
            navigate("/notes");
        } catch (error) {
            toast.error(t("noteDeletedError"));
        }
    };

    const editNote = () => {
        navigate(`/notes/${note.id}/edit`);
    };

    document.title = `${note.title} | ${t("notes")}`;
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1">
                <div className="m-3">
                    <div key={note.id} className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-3xl">{note.title}</h2>
                            <p className="trunacte text-ellipsis text-xl whitespace-pre-line">
                                {note.content}
                            </p>
                            <div className="card-actions justify-start mt-10">
                                <Link
                                    id={"toNotesButton"}
                                    className="tooltip"
                                    data-tip={t("backToNotes")}
                                    to={"/"}
                                >
                                    <ChevronLeftIcon className="h-10 w-10 text-blue-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 rounded-lg md:order-1 m-3">
                    {firebaseAuth && notesStatus !== "success" && <MapLoadingSkeleton />}
                    {note.location.coordinates[0] !== 0 && note.location.coordinates[1] !== 0 && (
                        <SingleNoteMap note={note} />
                    )}
                    <div className="grid grid-cols-2 mt-5">
                        <div className="">
                            <button
                                type="button"
                                onClick={editNote}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                {t("editNote")}
                            </button>
                            <button
                                type="button"
                                onClick={deleteNote}
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                {t("deleteNote")}
                            </button>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="tooltip" data-tip={t("createdAt")}>
                                <InboxArrowDownIcon className="m-auto h-7 w-7 text-blue-500" />
                                <p>{new Date(note.createdAt).toLocaleString()} </p>
                            </div>
                            {note?.modifiedAt && (
                                <div className="tooltip" data-tip={t("lastModified")}>
                                    <PencilSquareIcon className="m-auto h-7 w-7 text-blue-500" />
                                    <p>{new Date(note?.modifiedAt).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
