import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FireBaseUserInterface } from "../../types";
import notesService from "../../services/notes";
import AddingNoteMap from "./AddingNoteMap";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddNoteProps {
    firebaseAuth: FireBaseUserInterface | null;
}
const AddNote = (firebaseAuth: AddNoteProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    document.title = "Add note | Notes";

    const createNoteMutation = useMutation({
        mutationFn: notesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setTitle("");
            setContent("");
            navigate("/notes");
        }
    });

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            const location = {
                lat,
                lng
            };
            const note = {
                title,
                content,
                location
            };
            createNoteMutation.mutate(note);
        } catch (error) {
            console.log("Error adding note");
            console.log(error);
        }
    };

    return (
        <div>
            <AddingNoteMap setLat={setLat} setLng={setLng}></AddingNoteMap>
            <div className="container mx-auto px-4 align-content: center">
                <h1>Add note</h1>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        onChange={handleTitleChange}
                        value={title}
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <input
                        onChange={handleContentChange}
                        value={content}
                        type="text"
                        placeholder="Content"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <button onClick={submit} className="btn">
                    Add
                </button>
            </div>

            <h1>Add Note</h1>
        </div>
    );
};

export default AddNote;
