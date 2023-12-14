import Express from "express";

const infoRouter = Express.Router();

infoRouter.get("/health", async (_req, res) => {
    res.status(200).json({ message: "Server OK" });
});

export default infoRouter;
