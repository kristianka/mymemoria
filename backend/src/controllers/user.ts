import Express from "express";
import { User } from "../models/user";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";
import { Note } from "../models/note";
import { getAdminInstance } from "../utils/firebaseConnection";
import { Location } from "../models/location";

// express-async-error handles try-catch blocks!
const userRouter = Express.Router();

// backend receives the user id and token from firebase auth.
// middleware getUserFromReq checks if the user exists
userRouter.get("/:id", getUserFromReq, async (req: AuthRequest, res) => {
    // req.user is handled by getUserFromReq middleware
    const firebaseUserId = req.user?.user_id;
    const paramFirebaseUserId = req.params.id;

    if (paramFirebaseUserId !== firebaseUserId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ fireBaseUid: firebaseUserId }).populate({
        path: "defaultLocation"
    });
    if (!user || paramFirebaseUserId !== user.fireBaseUid) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json(user);
});

userRouter.post("/", async (req, res) => {
    const { name, uid } = req.body;
    if (!name || !uid) {
        return res.status(400).json({ error: "Missing name or uid" });
    }

    // default location is railway station helsinki. longitude, latitude
    const defaultLocation = new Location({
        coordinates: [24.94146985205316, 60.17110699565623]
    });

    const savedLocation = await defaultLocation.save();
    const user = new User({
        fireBaseUid: uid,
        name: name,
        defaultLocation: savedLocation._id
    });

    const savedUser = await user.save();
    return res.status(201).json(savedUser);
});

// user can update name and default location
userRouter.put("/:id", getUserFromReq, async (req: AuthRequest, res) => {
    // req.user is handled by getUserFromReq middleware
    const firebaseUserId = req.user?.user_id;
    const paramFirebaseUserId = req.params.id;
    const { name, defaultLocation } = req.body;
    const defaultCoordinates = defaultLocation?.coordinates;

    // check that name is ok
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Missing name or invalid value" });
    }

    if (paramFirebaseUserId !== firebaseUserId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ fireBaseUid: firebaseUserId }).populate({
        path: "defaultLocation"
    });

    if (!user || paramFirebaseUserId !== user.fireBaseUid) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // if request contains default location, save it to db
    if (defaultCoordinates) {
        // check that default location is ok
        if (
            !defaultCoordinates ||
            typeof defaultCoordinates[0] !== "number" ||
            typeof defaultCoordinates[1] !== "number"
        ) {
            return res.status(400).json({ error: "Missing default location or invalid value" });
        }

        const loc = new Location({
            coordinates: defaultCoordinates
        });

        const savedLocation = await loc.save();
        user.defaultLocation = savedLocation._id;
    }
    user.name = name;
    const updatedUser = await user.save();
    return res.json(updatedUser);
});

// user can delete their account
userRouter.delete("/:id", getUserFromReq, async (req: AuthRequest, res) => {
    // req.user is handled by getUserFromReq middleware
    const firebaseUserId = req.user?.user_id;
    const paramFirebaseUserId = req.params.id;

    if (paramFirebaseUserId !== firebaseUserId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ fireBaseUid: firebaseUserId });
    if (!user || paramFirebaseUserId !== user.fireBaseUid) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const admin = getAdminInstance();
    // delete user from mongodb and from firebase
    await user.deleteOne();
    await admin.auth().deleteUser(user.fireBaseUid);
    // delete user's notes
    await Note.deleteMany({ user: user._id });
    return res.status(204).end();
});

export default userRouter;
