import express from "express";
import cors from "cors";
import { PORT } from "./utils/config";
import { connectToMongo } from "./utils/mongoConnection";

import notesRouter from "./controllers/notes";
import userRouter from "./controllers/user";

const app = express();
app.use(cors());
app.use(express.json());

connectToMongo();

app.get("/", (_req, res) => {
    res.send("Hello world!");
});

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});

export default app;
