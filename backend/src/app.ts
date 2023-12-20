import express from "express";
import cors from "cors";
import { PORT } from "./utils/config";
import { connectToMongo } from "./utils/mongoConnection";
import { connectToFirebase } from "./utils/firebaseConnection";
import { errorHandler, getTokenFromReq, unknownEndpoint } from "./utils/middlewares";

import notesRouter from "./controllers/notes";
import userRouter from "./controllers/user";
import infoRouter from "./controllers/info";
import testingRouter from "./controllers/testing";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("../../dist"));

connectToMongo();
connectToFirebase();

app.use(errorHandler);

app.get("/", (_req, res) => {
    res.send("Hello world!");
});

// DO NOT RUN THIS IN PRODUCTION !!!
// THIS IS FOR TESTING, ALL DATA WILL BE DELETED
if (process.env.NODE_ENV === "testing") {
    app.use("/api/testing", testingRouter);
}

app.use(getTokenFromReq);
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/info", infoRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});

export default app;
