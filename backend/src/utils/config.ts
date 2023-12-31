import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { ServiceAccount } from "firebase-admin";

dotenv.config();

// Limit requests to 300 per 10 minutes
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    limit: 300, // 300 requests
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});

const PORT = process.env.PORT || 3000;
let MONGODB_URI = "";
let FIREBASE_CREDENTIALS: ServiceAccount;

if (process.env.NODE_ENV === "production") {
    MONGODB_URI = process.env.MONGODB_PRODUCTION_URI as string;
    const firebaseCredentials = {
        projectId: process.env.FIREBASE_PRODUCTION_PROJECT_ID,
        clientEmail: process.env.FIREBASE_PRODUCTION_CLIENT_EMAIL,
        privateKeyId: process.env.FIREBASE_PRODUCTION_PRIVATE_KEY_ID,
        // replace `\` and `n` character pairs w/ single `\n` character
        privateKey: process.env.FIREBASE_PRODUCTION_PRIVATE_KEY?.replace(/\\n/g, "\n")
    };
    FIREBASE_CREDENTIALS = firebaseCredentials as ServiceAccount;
} else if (process.env.NODE_ENV === "development") {
    MONGODB_URI = process.env.MONGODB_DEVELOPMENT_URI as string;
    const firebaseCredentials = {
        projectId: process.env.FIREBASE_DEVELOPMENT_PROJECT_ID,
        clientEmail: process.env.FIREBASE_DEVELOPMENT_CLIENT_EMAIL,
        privateKeyId: process.env.FIREBASE_DEVELOPMENT_PRIVATE_KEY_ID,
        // replace `\` and `n` character pairs w/ single `\n` character
        privateKey: process.env.FIREBASE_DEVELOPMENT_PRIVATE_KEY?.replace(/\\n/g, "\n")
    };
    FIREBASE_CREDENTIALS = firebaseCredentials as ServiceAccount;
} else if (process.env.NODE_ENV === "testing") {
    MONGODB_URI = process.env.MONGODB_TESTING_URI as string;
    const firebaseCredentials = {
        projectId: process.env.FIREBASE_TESTING_PROJECT_ID,
        clientEmail: process.env.FIREBASE_TESTING_CLIENT_EMAIL,
        privateKeyId: process.env.FIREBASE_TESTING_PRIVATE_KEY_ID,
        // replace `\` and `n` character pairs w/ single `\n` character
        privateKey: process.env.FIREBASE_TESTING_PRIVATE_KEY?.replace(/\\n/g, "\n")
    };
    FIREBASE_CREDENTIALS = firebaseCredentials as ServiceAccount;
} else {
    throw new Error("No NODE_ENV specified");
}

console.log("ENV is", process.env.NODE_ENV);
export { MONGODB_URI, FIREBASE_CREDENTIALS, PORT, limiter };
