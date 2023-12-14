import * as admin from "firebase-admin";

let initializedAdmin: any | null = null;
import * as credentials from "../../firebase-admin-sdk.json";

const connectToFirebase = () => {
    if (!initializedAdmin) {
        try {
            console.log("Connecting to Firebase...");
            admin.initializeApp({
                credential: admin.credential.cert({
                    ...credentials,
                    privateKey: credentials.private_key.replace(/\\n/g, "\n")
                }),
                databaseURL: process.env.FIREBASE_DB_URL
            });
            console.log("Successfully to Firebase!");
            initializedAdmin = admin;
        } catch (error) {
            console.log("Error while connecting to Firebase: ", error);
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
