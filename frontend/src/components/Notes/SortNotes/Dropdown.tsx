import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";

import { NoteInterface } from "../../../types";
import { sortNotesByCreationTime, sortNotesByLastModified } from "./sortingNotes";
import { useTranslation } from "react-i18next";

interface props {
    notes: NoteInterface[] | null;
    setSortedNotes: (notes: NoteInterface[]) => void;
}

type sortType = "lastModified" | "creationTimeNewestFirst" | "creationTimeOldestFirst";

const SortNotesDropdown = ({ notes, setSortedNotes }: props) => {
    const { t } = useTranslation();
    const [sortType, setSortType] = useState<sortType>("lastModified");

    return (
        <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn bg-base-100 rounded-lg">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <p>{t(sortType)}</p>
            </label>
            <div
                className="menu menu-sm dropdown-content mt-1 z-[10] p-2 shadow bg-base-100 rounded-box w-56"
                aria-labelledby="dropdownDefaultButton"
            >
                <button
                    onClick={() => {
                        const sorted = sortNotesByLastModified(notes, "desc");
                        setSortType("lastModified");
                        setSortedNotes(sorted);
                    }}
                    className="rounded-md block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    {t("lastModified")}
                </button>
                <button
                    onClick={() => {
                        const sorted = sortNotesByCreationTime(notes, "desc");
                        setSortType("creationTimeNewestFirst");
                        setSortedNotes(sorted);
                    }}
                    className="rounded-md block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    {t("creationTimeNewestFirst")}
                </button>
                <button
                    onClick={() => {
                        const sorted = sortNotesByCreationTime(notes, "asc");
                        setSortType("creationTimeOldestFirst");
                        setSortedNotes(sorted);
                    }}
                    className="rounded-md block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    {t("creationTimeOldestFirst")}
                </button>
            </div>
        </div>
    );
};

export default SortNotesDropdown;
