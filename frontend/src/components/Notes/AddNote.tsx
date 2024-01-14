import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { FireBaseUserInterface } from "../../types";
import notesService from "../../services/notes";
import AddingNoteMap from "./AddNoteMap";

interface AddNoteProps {
    firebaseAuth: FireBaseUserInterface | null;
}

const AddNote = ({ firebaseAuth }: AddNoteProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            toast.success(`Added note ${title} successfully!`);
            navigate("/notes");
        },
        onError: () => {
            toast.error("Error adding note, please try again later.");
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
            if (!title || !content) {
                toast.error("Please fill in title and content");
                return;
            }
            createNoteMutation.mutate(note);
        } catch (error) {
            console.error(error);
            toast.error("Error adding note, please try again later.");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 m-3">
                <div className="md:m-10">
                    <h1 className="text-center normal-case text-2xl">Add note</h1>
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
                    <AddingNoteMap setLat={setLat} setLng={setLng} firebaseAuth={firebaseAuth} />
                    <button
                        onClick={submit}
                        type="submit"
                        id="saveNoteButton"
                        className="mt-3 flex w-full justify-center rounded-md bg-gradient-to-r from-red-400 via-purple-500 to-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                    >
                        Add note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
