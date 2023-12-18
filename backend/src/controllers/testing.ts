import Express from "express";
import { User } from "../models/user";
import { Note } from "../models/note";
import { Location } from "../models/location";
import { getAdminInstance } from "../utils/firebaseConnection";

const testingRouter = Express.Router();

testingRouter.post("/reset", async (_req, res) => {
    const resetUsers = await User.deleteMany({});
    const resetNotes = await Note.deleteMany({});
    const resetLocations = await Location.deleteMany({});

    const admin = getAdminInstance();
    const listUsers = await admin.auth().listUsers();
    listUsers.users.forEach(async (userRecord) => {
        await admin.auth().deleteUser(userRecord.uid);
        console.log(`Deleted user with uid: ${userRecord.uid}`);
    });
    if (!resetUsers.acknowledged || !resetNotes.acknowledged || !resetLocations.acknowledged) {
        return res.status(500).json({ error: "Database reset failed" });
    }
    console.log("----- Database reset -----");
    return res.status(200).json({ message: "Database reset" });
});

export default testingRouter;
