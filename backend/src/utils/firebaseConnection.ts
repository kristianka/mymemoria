import * as admin from "firebase-admin";
import { FIREBASE_CREDENTIALS } from "./config";

let initializedAdmin: admin.app.App | null = null;

const connectToFirebase = () => {
    if (!initializedAdmin) {
        try {
            console.log("Connecting to Firebase...");
            initializedAdmin = admin.initializeApp({
                credential: admin.credential.cert({
                    ...FIREBASE_CREDENTIALS
                })
            });
            console.log("Successfully connected to Firebase!");
        } catch (error) {
            console.log("Error while connecting to Firebase: ", error);
            process.exit(1);
        }
    }

    return initializedAdmin;
};

const getAdminInstance = () => {
    if (!initializedAdmin) {
        throw new Error("Firebase Admin SDK is not initialized. Call connectToFirebase first.");
    }

    return initializedAdmin;
};

export { connectToFirebase, getAdminInstance };
