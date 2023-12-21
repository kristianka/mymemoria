import express from "express";
import cors from "cors";
import path from "path";

import { limiter, PORT } from "./utils/config";
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
app.use(errorHandler);

connectToMongo();
connectToFirebase();

// Limit requests to 200 per 10 minutes (except in testing)
if (process.env.NODE_ENV !== "testing") {
    app.use(limiter);
}

// DO NOT RUN THIS IN PRODUCTION !!!
// THIS IS FOR TESTING, ALL DATA WILL BE DELETED
if (process.env.NODE_ENV === "testing") {
    app.use("/api/testing", testingRouter);
}

app.use(getTokenFromReq);
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/info", infoRouter);

// serve built static files from the React frontend app if in production or testing
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.get("/*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
    });
}

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});

export default app;
