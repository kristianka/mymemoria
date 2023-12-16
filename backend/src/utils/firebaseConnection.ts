import * as admin from "firebase-admin";
import * as credentials from "../../firebase-admin-sdk.json";

let initializedAdmin: admin.app.App | null = null;

const connectToFirebase = () => {
    if (!initializedAdmin) {
        try {
            console.log("Connecting to Firebase...");
            initializedAdmin = admin.initializeApp({
                credential: admin.credential.cert({
                    ...credentials,
                    privateKey: credentials.private_key.replace(/\\n/g, "\n")
                }),
                databaseURL: process.env.FIREBASE_DB_URL
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
