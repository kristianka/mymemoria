import express from "express";
import cors from "cors";
import { PORT } from "./utils/config";
import { connectToMongo } from "./utils/mongoConnection";

const app = express();
app.use(cors());
app.use(express.json());

connectToMongo();

app.get("/", (_req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
