import { useQuery } from "@tanstack/react-query";
import notesService from "../services/notes";
import { FireBaseUserInterface } from "../types";

const useNotes = (firebaseAuth: FireBaseUserInterface | null) => {
    return useQuery({
        queryKey: ["notes"],
        enabled: !!firebaseAuth,
        queryFn: async () => {
            return notesService.getAll();
        }
    });
};

export default useNotes;
