import { useQuery } from "@tanstack/react-query";
import notesService from "../services/notes";
import { LoggedInUser } from "../types";

const useNotes = (user: LoggedInUser | null) => {
    return useQuery({
        queryKey: ["notes"],
        enabled: !!user,
        queryFn: async () => {
            return notesService.getAll();
        }
    });
};

export default useNotes;
