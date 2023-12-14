import Express from "express";
import { Note } from "../models/note";
import { User } from "../models/user";
import { Location } from "../models/location";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";

const notesRouter = Express.Router();

notesRouter.get("/", getUserFromReq, async (req: any, res) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findOne({ fireBaseUid: userId }).populate({
            path: "notes",
            populate: {
                path: "location",
                model: Location
            }
        });
        console.log("USER ID IS", userId);
        if (!user || userId !== user.fireBaseUid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        console.log(user.notes);
        return res.json(user.notes);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
});

notesRouter.get("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const note = await Note.findById(req.params.id);

        if (req.user.id !== user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (note) {
            return res.json(note);
        } else {
            return res.status(404).end();
        }
    } catch (error) {
        return next(error);
        // return res.status(400).json({ error: error });
    }
});

notesRouter.post("/", getUserFromReq, async (req: AuthRequest, res) => {
    try {
        const { title, content, location } = req.body;
        if (!title || !content || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await User.findOne({ fireBaseUid: req.user.uid });
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
        console.log(`Added note ${savedNote.title} to user ${user.name}`);
        return res.status(201).json(savedNote);
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
});

export default notesRouter;
