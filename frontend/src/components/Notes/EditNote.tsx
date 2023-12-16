import { useNavigate, useParams } from "react-router-dom";
import { FireBaseUserInterface, NoteInterface } from "../../types";
import useUser from "../../hooks/useUser";
import useNotes from "../../hooks/useNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotFound from "../NotFound";
import notesService from "../../services/notes";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const EditNote = ({ firebaseAuth }: props) => {
    const { id } = useParams();
    const { data: user } = useUser(firebaseAuth);
    const { data: notes, status: notesStatus } = useNotes(user || null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    // set valuess
    useEffect(() => {
        const note: NoteInterface | undefined = notes?.find((note) => note.id === id);
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [id, notes]);

    document.title = "Edit note | Notes";

    const updateNoteMutation = useMutation({
        mutationFn: notesService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setTitle("");
            setContent("");
            navigate(`/notes/${id}`);
        }
    });

    if (notesStatus === "pending") {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    if (notesStatus === "error") {
        toast.error("Error getting note, please try again later.");
        return <div>Something went wrong, please try again later</div>;
    }

    const note: NoteInterface | undefined = notes?.find((note) => note.id === id);

    if (!note) {
        return <NotFound></NotFound>;
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!title || !content) {
                toast.error("Please fill in all fields");
                return;
            }
            if (!id) {
                return;
            }
            const obj = {
                id,
                title,
                content
            };
            updateNoteMutation.mutate(obj);
            toast.success("Note updated successfully");
        } catch (error) {
            toast.error("Error updating note, please try again later.");
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto px-4 align-content: center">
            <h1>Edit note</h1>
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
    );
};

export default EditNote;
