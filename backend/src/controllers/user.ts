import Express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { getUserFromReq } from "../utils/middlewares";
import { AuthRequest } from "../types";

const userRouter = Express.Router();

userRouter.get("/", async (_req, res) => {
    const users = await User.find({}).populate("notes");
    res.json(users);
});

userRouter.get("/:id", getUserFromReq, async (req: AuthRequest, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(req.user.id).populate("favouriteLocations");
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
});

userRouter.post("/", async (req, res, next) => {
    try {
        console.log("POST /api/users");
        const { username, name, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            name,
            passwordHash
        });

        const savedUser = await user.save();
        return res.status(201).json(savedUser);
    } catch (error: any) {
        console.log(error.message);
        return next(error);
    }
});

export default userRouter;
