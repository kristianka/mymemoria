import Express from "express";
import { User } from "../models/user";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";
import { Note } from "../models/note";
import { getAdminInstance } from "../utils/firebaseConnection";

const userRouter = Express.Router();

userRouter.get("/", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const userId = req.user?.user_id;
        const user = await User.findOne({ fireBaseUid: userId }).populate("favouriteLocations");
        if (!user || userId !== user.fireBaseUid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

userRouter.get("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        if (req.user?.id !== req.params.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(req.user.id).populate("favouriteLocations");
        return res.json(user);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

userRouter.post("/", async (req, res, next) => {
    try {
        const { name, uid } = req.body;
        if (!name || !uid) {
            return res.status(400).json({ error: "Missing name or uid" });
        }

        const user = new User({
            fireBaseUid: uid,
            name: name
        });

        const savedUser = await user.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// user can update name
userRouter.put("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        console.log(req.user?.id, req.params.id);
        if (req.user?.id !== req.params.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Missing name" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name: name },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// user can delete their account
userRouter.delete("/:id", getUserFromReq, async (req: AuthRequest, res, next) => {
    try {
        const userId = req.user?.user_id;

        const user = await User.findOne({ fireBaseUid: userId })
            .populate("favouriteLocations")
            .populate("notes");
        if (!user || userId !== user.fireBaseUid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const admin = getAdminInstance();
        // delete user from mongodb and from firebase
        await user?.deleteOne();
        await admin.auth().deleteUser(user.fireBaseUid);
        // delete user's notes
        await Note.deleteMany({ user: user._id });
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

export default userRouter;
