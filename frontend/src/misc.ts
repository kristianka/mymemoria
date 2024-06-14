import i18next from "i18next";
import { NoteInterface } from "./types";

// toggle between languages
export const changeLanguage = (language: string) => {
    const newLanguage = language;
    i18next.changeLanguage(newLanguage);
    localStorage.setItem("i18nextLng", newLanguage);
};

// Filter boxes based on search input
// updating the list as the user types. not case-sensitive
export const searchNotes = (sortedNotes: NoteInterface[], search: string) => {
    if (search === "") {
        return sortedNotes;
    }
    const lowerCaseSearch = search.toLowerCase();
    return sortedNotes.filter((note) => {
        // Check both title and content for the search term, ignoring case
        const titleMatch = note.title?.toLowerCase().includes(lowerCaseSearch);
        const contentMatch = note.content?.toLowerCase().includes(lowerCaseSearch);
        return search === "" || titleMatch || contentMatch;
    });
};
