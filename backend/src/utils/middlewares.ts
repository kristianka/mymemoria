import { NextFunction, Request, Response } from "express";
import { Error as mongoError } from "mongoose";
import jwt from "jsonwebtoken";

const errorHandler = (
    error: Error | mongoError,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("in errorHandler");
    if (process.env.NODE_ENV !== "test") {
        console.error(error.message);
    }

    if (error instanceof mongoError && "code" in error) {
        if (error.name === "MongoConnectionException") {
            return res.status(500).json({ error: "Server error. Please try again later" });
        } else if (error.code === 11000) {
            return res.status(409).json({ error: "Duplicate key error" });
        } else if (error.code === 2) {
            return res.status(503).json({ error: "Operation failed" });
        }
    }

    if (error instanceof Error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Incorrect formatting" });
        } else if (error.name === "ValidationError") {
            return res.status(400).json({ error: `Received invalid data: ${error.message}` });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        } else if (error.name.includes("SyntaxError")) {
            return res.status(400).json({ error: "Bad request" });
        }
    }

    return next(error);
};

interface AuthRequest extends Request {
    token?: string;
    // TODO: add user type
    user?: any;
}

const getTokenFromReq = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authorization = req.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "");
    } else {
        req.token = undefined;
    }
    next();
};

const getUserFromReq = (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.token || !process.env.SECRET) {
        req.user = undefined;
        return next();
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (typeof decodedToken === "object") {
        req.user = decodedToken;
    } else {
        req.user = undefined;
    }
    next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
    console.log("in unknownEndpoint");
    return res.status(404).send("Not found");
};

export { getTokenFromReq, getUserFromReq, unknownEndpoint, errorHandler };
