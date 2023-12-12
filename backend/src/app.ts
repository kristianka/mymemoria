import express from "express";
import cors from "cors";
import { PORT } from "./utils/config";
import { connectToMongo } from "./utils/mongoConnection";
import { connectToFirebase } from "./utils/firebaseConnection";
import { errorHandler, getTokenFromReq, unknownEndpoint } from "./utils/middlewares";

import notesRouter from "./controllers/notes";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";

const app = express();
app.use(cors());
app.use(express.json());

connectToMongo();
connectToFirebase();

app.use(errorHandler);

app.get("/", (_req, res) => {
    res.send("Hello world!");
});

app.use(getTokenFromReq);
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});

export default app;
