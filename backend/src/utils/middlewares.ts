import { NextFunction, Request, Response } from "express";

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return res.status(404).json({ error: "Not found" });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Something went wrong!" });
};

export { errorHandler };
