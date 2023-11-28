import Express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInterface } from "../types";

const loginRouter = Express.Router();

loginRouter.get("/", async (_req, res) => {
    res.json({ message: "Hello from login!" });
});

loginRouter.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user: UserInterface | null = await User.findOne({ username });
        const passwordCorrect =
            user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if (!(user && passwordCorrect)) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const userForToken = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: 60 * 60 });
        const givenAt = new Date(Date.now());
        // expires in one hour
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        return res
            .status(200)
            .send({ token, givenAt, expiresAt, username: user.username, name: user.name });
    } catch (error) {
        return next(error);
    }
});

export default loginRouter;
