import dotenv from "dotenv";

//import * as prod_credentials from "../../firebase-admin-prod-sdk.json";
//import * as dev_credentials from "../../firebase-admin-dev-sdk.json";
// import * as testing_credentials from "../../firebase-admin-testing-sdk.json";
import { ServiceAccount } from "firebase-admin";

dotenv.config();

const PORT = process.env.PORT || 3000;
let MONGODB_URI = "";
let FIREBASE_CREDENTIALS: ServiceAccount;

// TO DO: FIX THIS
MONGODB_URI = process.env.MONGODB_TEST_URI as string;

const obj = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
};
FIREBASE_CREDENTIALS = obj as ServiceAccount;

// else {
//     FIREBASE_CREDENTIALS = testing_credentials as ServiceAccount;
// }

// // set correct env (prod, dev, testing) to firebase auth and mongodb
// if (process.env.NODE_ENV === "production") {
//     MONGODB_URI = process.env.MONGODB_PROD_URI as string;
//     FIREBASE_CREDENTIALS = prod_credentials as ServiceAccount;
// } else if (process.env.NODE_ENV === "development") {
//     MONGODB_URI = process.env.MONGODB_DEV_URI as string;
//     FIREBASE_CREDENTIALS = dev_credentials as ServiceAccount;
// } else if (process.env.NODE_ENV === "test") {
// } else {
//     throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`);
// }

console.log("ENV is", process.env.NODE_ENV);
export { MONGODB_URI, FIREBASE_CREDENTIALS, PORT };
