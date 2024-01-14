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

const env = import.meta.env.MODE;

if (env === "production") {
    firebaseConfig = firebaseConfigProd;
} else if (env === "development") {
    firebaseConfig = firebaseConfigDev;
    console.log("ENV is", env);
} else if (env === "testing") {
    toast.info(`Using ${env} environment`);
    firebaseConfig = firebaseConfigTesting;
    console.log("ENV is", env);
} else {
    throw new Error(`Invalid env: ${env}`);
}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
