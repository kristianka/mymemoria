import Express from "express";
import { User } from "../models/user";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";

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
        // return res.status(400).json({ error: error });
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
        // return res.status(400).json({ error: error });
        return next(error);
    }
});

userRouter.post("/", async (req, res, next) => {
    try {
        const { name, uid } = req.body;
        if (!name || !uid) {
            return res.status(400).json({ error: "Missing name or uid" });
        }

        if (process.env.NODE_ENV === "test") console.log("Creating new user:", name, ", ", uid);

        const user = new User({
            fireBaseUid: uid,
            name: name
        });

        const savedUser = await user.save();
        // const findSavedUser = await User.findOne({ fireBaseUid: uid });
        // console.log("findSavedUser", findSavedUser);
        // setTimeout(() => {
        //     // needed for database delay when registering via cypress because of the database delay
        // }, 3000);

        return res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

export default userRouter;
