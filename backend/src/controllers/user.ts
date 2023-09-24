import Express from "express";
import { Note } from "../models/note";
import { User } from "../models/user";
import { Location } from "../models/location";

const userRouter = Express.Router();

userRouter.get("/", async (_req, res) => {
    const users = await User.find({}).populate("notes");
    res.json(users);
});

userRouter.post("/", async (req, res) => {
    try {
        const { title, content, location } = req.body;
        const user = await User.findOne({ username: "testuser" });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const loc = new Location({
            name: location.name,
            address: location.address,
            city: location.city,
            postalCode: location.postalCode,
            country: location.country
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
        console.log(`Added note ${savedNote.title} to user ${user.username}`);
        return res.status(201).json(savedNote);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});

export default userRouter;
