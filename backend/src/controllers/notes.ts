import Express from "express";
import { Note } from "../models/note";
import { User } from "../models/user";
import { Location } from "../models/location";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";

const notesRouter = Express.Router();

// get all user's notes
notesRouter.get("/", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const userId = req.user?.user_id;
        const user = await User.findOne({ fireBaseUid: userId }).populate({
            path: "notes",
            populate: {
                path: "location",
                model: Location
            }
        });
        if (!user || userId !== user.fireBaseUid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return res.json(user.notes);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// get by id, not really used because you can just get all notes and filter by id
notesRouter.get("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const user = await User.findById(req.user?.id);
        const note = await Note.findById(req.params.id);

        if (req.user?.id !== user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (note) {
            return res.json(note);
        } else {
            return res.status(404).end();
        }
    } catch (error) {
        return next(error);
    }
});

// post note
notesRouter.post("/", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const { title, content, location } = req.body;
        if (!title || !content || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await User.findOne({ fireBaseUid: req.user?.uid });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // note the order!!!
        const loc = new Location({
            coordinates: [location.lng, location.lat]
        });

        const savedLocation = await loc.save();
        await user.save();

        const note = new Note({
            title,
            content,
            location: savedLocation._id,
            user: user._id
        });

        const savedNote = await note.save();
        user.notes.push(savedNote._id);
        await user.save();

        return res.status(201).json(savedNote);
    } catch (error) {
        return next(error);
    }
});

// update note
notesRouter.put("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await User.findById(req.user?.id);
        const note = await Note.findById(req.params.id);

        if (req.user?.id !== user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!note) {
            return res.status(404).end();
        }

        note.title = title;
        note.content = content;
        const savedNote = await note.save();
        return res.status(200).json(savedNote);
    } catch (error) {
        return next(error);
    }
});

// delete note
notesRouter.delete("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const user = await User.findById(req.user?.id);
        const note = await Note.findById(req.params.id);

        if (req.user?.id !== user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!note) {
            return res.status(404).end();
        }

        await note.deleteOne();
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
});

export default notesRouter;
