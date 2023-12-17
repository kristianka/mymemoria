import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

let firebaseConfig;

const firebaseConfigProd = {
    apiKey: import.meta.env.VITE_FIREBASE_PROD_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_PROD_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROD_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_PROD_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_PROD_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_PROD_APP_ID
};

const firebaseConfigDev = {
    apiKey: import.meta.env.VITE_FIREBASE_DEV_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_DEV_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_DEV_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_DEV_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_DEV_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_DEV_APP_ID
};

const firebaseConfigTesting = {
    apiKey: import.meta.env.VITE_FIREBASE_TESTING_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_TESTING_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_TESTING_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_TESTING_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_TESTING_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_TESTING_APP_ID
};

if (process.env.NODE_ENV === "production") {
    firebaseConfig = firebaseConfigProd;
} else if (process.env.NODE_ENV === "development") {
    firebaseConfig = firebaseConfigDev;
} else if (process.env.NODE_ENV === "test") {
    toast.info(`Using ${process.env.NODE_ENV} environment`);
    firebaseConfig = firebaseConfigTesting;
} else {
    throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`);
}

console.log("ENV is", process.env.NODE_ENV);
console.log("firebaseConfig is", firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
