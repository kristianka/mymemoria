import Express from "express";
import { Note } from "../models/note";
import { User } from "../models/user";
import { Location } from "../models/location";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";

const notesRouter = Express.Router();

notesRouter.get("/", getUserFromReq, async (req: AuthRequest, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "notes",
            populate: {
                path: "location",
                model: Location
            }
        });
        if (req.user.id !== user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return res.json(user?.notes);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
});

notesRouter.get("/:id", async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        return res.json(note);
    } else {
        return res.status(404).end();
    }
});

notesRouter.post("/", getUserFromReq, async (req: AuthRequest, res) => {
    try {
        const { title, content, location } = req.body;
        if (!title || !content || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await User.findById(req.user.id);
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
            location: (savedLocation as any)._id,
            user: user._id
        });

        const savedNote = await note.save();
        user.notes.push(savedNote._id);
        await user.save();
        // remove before production
        console.log(`Added note ${savedNote.title} to user ${user.username}`);
        return res.status(201).json(savedNote);
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
});

export default notesRouter;
