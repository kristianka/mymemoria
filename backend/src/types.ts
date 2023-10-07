export interface UserInterface {
    _id: string;
    username: string;
    name: string;
    passwordHash: string;
}

import { Request } from "express";
export interface AuthRequest extends Request {
    token?: string;
    // TODO: add user type
    user?: any;
}
