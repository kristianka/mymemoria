import Express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";

const userRouter = Express.Router();

userRouter.get("/", async (_req, res) => {
    const users = await User.find({}).populate("notes");
    res.json(users);
});

userRouter.post("/", async (req, res, next) => {
    try {
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
