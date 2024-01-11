import { NoteInterface } from "../../../types";

type Order = "asc" | "desc";

// desc is newest first, asc is oldest first

// sort notes by creation time, ascending or descending
export const sortNotesByCreationTime = (notes: NoteInterface[], order: Order) => {
    const sorted = [...notes].sort((a, b) => {
        const comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return order === "desc" ? comparison : -comparison;
    });
    return sorted;
};

// sort notes by last modified time, ascending or descending
export const sortNotesByLastModified = (notes: NoteInterface[], order: Order) => {
    // sort by modifiedAt if it exists, otherwise createdAt
    const sorted = [...notes].sort((a, b) => {
        const aDate = a.modifiedAt ? a.modifiedAt : a.createdAt;
        const bDate = b.modifiedAt ? b.modifiedAt : b.createdAt;
        const comparison = new Date(bDate).getTime() - new Date(aDate).getTime();
        return order === "desc" ? comparison : -comparison;
    });
    return sorted;
};
