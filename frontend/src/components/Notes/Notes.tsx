import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { sortNotesByLastModified } from "./SortNotes/sortingNotes";
import useNotes from "../../hooks/useNotes";
import useUser from "../../hooks/useUser";
import { FireBaseUserInterface, NoteInterface } from "../../types";

import Map from "./Map";
import NotesLoadingSkeleton from "./NotesLoadingSkeleton";
import MapLoadingSkeleton from "./MapLoadingSkeleton";
import NoteCard from "./NoteCard";
import SortNotesDropdown from "./SortNotes/Dropdown";
import SortNotesLoadingSkeleton from "./SortNotes/SortNotesLoadingSkeleton";
import ErrorPage from "../ErrorPage";
import NewNoteButton from "./NewNoteButton";
import NewNoteLoadingSkeleton from "./NewNoteButtonLoadingSkeleton";
import { useTranslation } from "react-i18next";
import AnnouncementBanner from "../AnnouncementBanner";
import Search from "./Search";
import { searchNotes } from "../../misc";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Notes = ({ firebaseAuth }: props) => {
    const { t } = useTranslation();
    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const [sortedNotes, setSortedNotes] = useState<NoteInterface[] | null>(null);

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [disableSearch, setDisableSearch] = useState<boolean>(true);

    // if user is not logged in, redirect to front page
    // useEffect to prevent infinite loop if server is down
    useEffect(() => {
        if ((!user && userStatus !== "pending") || !firebaseAuth) {
            navigate("/");
        }
    }, [user, userStatus, navigate, firebaseAuth]);

    useEffect(() => {
        // set notes from react query to state
        if (notes) {
            const sorted = sortNotesByLastModified(notes, "desc");
            const sortedAndSearched = searchNotes(sorted, search);
            setSortedNotes(sortedAndSearched || null);
            setDisableSearch(false);
        }
        // reset sortedNotes if notesStatus changes to pending
        if (notesStatus === "pending") {
            setSortedNotes(null);
            setDisableSearch(true);
        }
    }, [notes, notesStatus, search]);

    document.title = t("yourNotes") + " | " + t("appName");

    if (notesStatus === "error" || userStatus === "error") {
        toast.error(t("errorGettingNotes"));
        return <ErrorPage />;
    }

    if (notesStatus === "success" && notes?.length === 0) {
        return (
            <div className="m-auto">
                <h1 className="text-center normal-case text-3xl">{t("noNotesYet")}</h1>
                <p className="text-center normal-case text-xl p-3">{t("noNotesYetInfo")} ✏️</p>
                <div className="flex-1 text-center">
                    <Link to="/notes/add" className="btn btn-ghost rounded-lg">
                        <PencilSquareIcon className="w-10 h-10 text-blue-500" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1">
                <div className="divide-y m-3 bg-white rounded-lg">
                    <div className="m-1 p-3 bg-white rounded-lg grid grid-cols-2">
                        <h1 className="m-auto text-center normal-case text-2xl">
                            {t("yourNotes")}
                        </h1>
                        <div className="ml-5">
                            <Search disableSearch={disableSearch} setSearch={setSearch} />
                        </div>
                    </div>
                    {/* render three loading skeletons */}
                    {firebaseAuth &&
                        notesStatus === "pending" &&
                        [...Array(3)].map((_, i) => <NotesLoadingSkeleton key={i} />)}{" "}
                    {sortedNotes?.map((note: NoteInterface) => (
                        <NoteCard key={note.id} note={note}></NoteCard>
                    ))}
                </div>
                <div className="rounded-lg md:order-1 m-3">
                    {firebaseAuth && notesStatus === "pending" && (
                        <>
                            <MapLoadingSkeleton />
                            <div className="flex">
                                <SortNotesLoadingSkeleton />
                                <NewNoteLoadingSkeleton />
                            </div>
                        </>
                    )}
                    {notes && notes.length !== 0 && (
                        <>
                            <Map firebaseAuth={firebaseAuth} />
                            <div className="flex mt-3">
                                <SortNotesDropdown
                                    notes={sortedNotes}
                                    setSortedNotes={setSortedNotes}
                                />
                                <NewNoteButton />
                                <p className="m-auto text-gray-600 text-center normal-case text-md">
                                    {t("youHave")} {notes?.length} {t("notesHeader")}
                                </p>
                            </div>
                            <AnnouncementBanner />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
