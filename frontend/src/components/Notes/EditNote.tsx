import { useNavigate, useParams } from "react-router-dom";
import { FireBaseUserInterface, NoteInterface } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useUser from "../../hooks/useUser";
import useNotes from "../../hooks/useNotes";
import NotFound from "../NotFound";
import notesService from "../../services/notes";
import EditNoteMap from "./EditNoteMap";

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
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    document.title = "Edit note | Notes";

    useEffect(() => {
        if (!firebaseAuth) {
            navigate("/");
        }
    }, [firebaseAuth, navigate]);

    const note: NoteInterface | undefined = notes?.find((note) => note.id === id);

    // set values
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setLng(note.location.coordinates[0]);
            setLat(note.location.coordinates[1]);
        }
    }, [id, note, notes]);

    const updateNoteMutation = useMutation({
        mutationFn: notesService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setTitle("");
            setContent("");
            toast.success("Note updated successfully");
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

    if (!note) {
        return <NotFound></NotFound>;
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            if (!title || !content) {
                toast.error("Please fill in all fields");
                return;
            }
            const location = {
                lat,
                lng
            };

            if (!id) {
                return;
            }
            const obj = {
                id,
                title,
                content,
                location
            };
            updateNoteMutation.mutate(obj);
        } catch (error) {
            toast.error("Error updating note, please try again later.");
            console.error(error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 m-3">
                <div className="md:m-10">
                    <h1 className="text-center normal-case text-2xl">Edit note</h1>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    value={title}
                                    onChange={handleTitleChange}
                                    name="title"
                                    type="text"
                                    required
                                    id="noteTitle"
                                    placeholder="Title"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Content
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    name="content"
                                    required
                                    id="noteContent"
                                    placeholder="Content"
                                    rows={10}
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-5"
                    >
                        Location
                    </label>
                    <div className="mt-2"></div>
                    <EditNoteMap note={note} setLat={setLat} setLng={setLng} />

                    <button
                        onClick={submit}
                        type="submit"
                        id="editNoteButton"
                        className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                    >
                        Edit note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditNote;
