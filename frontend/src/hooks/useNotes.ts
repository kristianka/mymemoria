import { useQuery } from "@tanstack/react-query";
import notesService from "../services/notes";
import { BackendUserInterface } from "../types";

const useNotes = (user: BackendUserInterface | null) => {
    return useQuery({
        queryKey: ["notes"],
        enabled: !!user,
        queryFn: async () => {
            const notes = await notesService.getAll();
            return notes;
        }
    });
};

export default useNotes;
