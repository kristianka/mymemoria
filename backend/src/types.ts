import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

export interface AuthRequest extends Request {
    token?: string;
    // TODO: add user type
    user?: DecodedIdToken;
}

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

export interface FirebaseCredentialsInterface {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
}
