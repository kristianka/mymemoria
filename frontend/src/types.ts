export interface NoteInterface {
    id: string;
    title: string;
    content: string;
    user: string;
    location: {
        coordinates: [number, number];
    };
    createdAt: string;
    modifiedAt?: string;
}

import { UserMetadata } from "firebase/auth";

export interface FireBaseUserInterface {
    email: string | null;
    uid: string;
    emailVerified: boolean;
    metadata?: UserMetadata;
}

export interface BackendUserInterface {
    id: string;
    fireBaseUid: string;
    name: string;
    notes: NoteInterface[];
    favouriteLocations: string[];
}

// user id is automatically added to the note on backend
export interface CreateNoteInterface {
    title: string;
    content: string;
    location: {
        lat: number;
        lng: number;
    };
}
