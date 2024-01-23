import { NextFunction, Request, Response } from "express";
import { getAdminInstance } from "./firebaseConnection";
import { AuthRequest } from "../types";

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== "testing") {
        console.error(error);
    }

    // it seems to be that firebase and mongoose use normal "Error" class,
    // so we can't use instanceof which leads to little stupid code
    // feel free to try, prints true
    // console.log(error instanceof Error);

    // firebase errors
    if (error.message.includes("auth/id-token-expired")) {
        return res.status(401).json({ error: "Token expired" });
    } else if (error.message.includes("auth/id-token-revoked")) {
        return res.status(401).json({ error: "Token revoked" });
    } else if (error.message.includes("auth/argument-error")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("auth/invalid-argument")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("auth/invalid-claims")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("auth/invalid-creation-time")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("auth/invalid-disabled-field")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("Decoding Firebase ID token failed")) {
        return res.status(400).json({ error: "Invalid token" });
    } else if (error.message.includes("Firebase ID token has invalid signature.")) {
        return res.status(400).json({ error: "Invalid token" });
    }

    // mongoose errors
    if (error.message.includes("MongoConnectionException")) {
        return res.status(500).json({ error: "Server error. Please try again later" });
    } else if (error.message.includes("E11000")) {
        return res.status(409).json({ error: "Duplicate key error" });
    } else if (error.message.includes("ECONNREFUSED")) {
        return res.status(503).json({ error: "Operation failed" });
    }

    // normal errors
    if (error.message.includes("CastError")) {
        return res.status(400).json({ error: "Bad request." });
    } else if (error.message.includes("Cast to ObjectId failed for value")) {
        return res.status(401).json({ error: "Bad request." });
    } else if (error.message.includes("ValidationError")) {
        return res.status(400).json({ error: `Received invalid data}` });
    } else if (error.message.includes("SyntaxError")) {
        return res.status(400).json({ error: "Bad request" });
    } else if (error.message.includes("TypeError")) {
        return res.status(400).json({ error: "Bad request." });
    }

    // continue to 404. don't reveal internal errors to user
    if (process.env.NODE_ENV === "production") {
        return res
            .status(500)
            .json({ error: "An unexpected error has occurred. Please try again later." });
    } else {
        return next(error);
    }
};

const getTokenFromReq = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authorization = req.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "");
    } else {
        req.token = undefined;
    }
    next();
};

// matches received token with firebase auth
const getUserFromReq = async (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.token) {
        return next();
    }
    const admin = getAdminInstance();
    try {
        const decodedUser = await admin.auth().verifyIdToken(req.token);
        req.user = decodedUser;
    } catch (error) {
        return next(error);
    }
    next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
    return res.status(404).json({ error: "Not found" });
};

export { getTokenFromReq, getUserFromReq, unknownEndpoint, errorHandler };
