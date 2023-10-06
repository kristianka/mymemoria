export interface Note {
    id: string;
    title: string;
    content: string;
    location: string;
    user: string;
}

export interface UserInterface {
    _id: string;
    username: string;
    name: string;
    passwordHash: string;
}

export interface RegisterCredentials {
    username: string;
    name: string;
    password: string;
}