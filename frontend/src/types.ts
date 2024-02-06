import { UserMetadata } from "firebase/auth";

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
    defaultLocation: {
        coordinates: [number, number];
    };
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

export interface UpdateUserInterface {
    id: string;
    name: string;
    defaultLocation: {
        coordinates: [number, number];
    };
}

export interface UpdateNoteInterface {
    id: string;
    title: string;
    content: string;
    location: {
        lat: number;
        lng: number;
    };
}

export interface GeocoderResultInterface {
    result: {
        center: [number, number];
    };
}

export interface GeolocationPositionInterface {
    coords: {
        latitude: number;
        longitude: number;
    };
    timestamp: number;
    type: string;
}
