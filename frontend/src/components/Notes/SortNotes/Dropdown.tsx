import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";

import { NoteInterface } from "../../../types";
import { sortNotesByCreationTime, sortNotesByLastModified } from "./sortingNotes";

interface props {
    notes: NoteInterface[];
    setSortedNotes: (notes: NoteInterface[]) => void;
}

type sortType = "Last modified" | "Creation time (newest first)" | "Creation time (oldest first)";

const SortNotesDropdown = ({ notes, setSortedNotes }: props) => {
    const [sortType, setSortType] = useState<sortType>("Last modified");

    return (
        <div className="dropdown dropdown-start mt-3">
            <label tabIndex={0} className="btn bg-base-100 rounded-lg">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <p>{sortType}</p>
            </label>
            <div
                className="menu menu-sm dropdown-content mt-5 z-[10] p-2 shadow bg-base-100 rounded-box w-56"
                aria-labelledby="dropdownDefaultButton"
            >
                <button
                    onClick={() => {
                        const sorted = sortNotesByLastModified(notes, "desc");
                        setSortType("Last modified");
                        setSortedNotes(sorted);
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    Last modified
                </button>
                <button
                    onClick={() => {
                        const sorted = sortNotesByCreationTime(notes, "desc");
                        setSortType("Creation time (newest first)");
                        setSortedNotes(sorted);
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    Creation time (newest first)
                </button>
                <button
                    onClick={() => {
                        const sorted = sortNotesByCreationTime(notes, "asc");
                        setSortType("Creation time (oldest first)");
                        setSortedNotes(sorted);
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 text-left"
                >
                    Creation time (oldest first)
                </button>
            </div>
        </div>
    );
};

export default SortNotesDropdown;
