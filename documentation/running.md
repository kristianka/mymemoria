<h1>Running</h1>

This project has three different Firebase Auth and MongoDB credentials: development, testing and production.

<h2>Development</h2>

-   Start the backend: `npm run dev`
-   Start the frontend: `npm run dev`

-   You need .env files for frontend and backend with the following credentials:

<h3>Backend</h3>

-   `PORT`
-   `MONGODB_DEVELOPMENT_URI`
-   `FIREBASE_DEVELOPMENT_PROJECT_ID`
-   `FIREBASE_DEVELOPMENT_CLIENT_EMAIL`
-   `FIREBASE_DEVELOPMENT_PRIVATE_KEY_ID`
-   `FIREBASE_DEVELOPMENT_PRIVATE_KEY`

<h3>Frontend</h3>

-   `VITE_MAPBOX_API`
-   `VITE_FIREBASE_DEV_API_KEY`
-   `VITE_FIREBASE_DEV_AUTH_DOMAIN`
-   `VITE_FIREBASE_DEV_PROJECT_ID`
-   `VITE_FIREBASE_DEV_STORAGE_BUCKET`
-   `VITE_FIREBASE_DEV_MESSAGING_SENDER_ID`
-   `VITE_FIREBASE_DEV_APP_ID`

<h2>Testing</h2>

-   Start the backend: `npm run start:testing-env`
-   Start the frontend: `npm run start:testing-env`
-   Start cypress: ` npm run cypress:open`

<h3>Backend</h3>

-   `PORT`
-   `MONGODB_TESTING_URI`
-   `FIREBASE_TESTING_PROJECT_ID`
-   `FIREBASE_TESTING_CLIENT_EMAIL`
-   `FIREBASE_TESTING_PRIVATE_KEY_ID`
-   `FIREBASE_TESTING_PRIVATE_KEY`

<h3>Frontend</h3>

-   `VITE_MAPBOX_API`
-   `VITE_FIREBASE_TESTING_API_KEY`
-   `VITE_FIREBASE_TESTING_AUTH_DOMAIN`
-   `VITE_FIREBASE_TESTING_PROJECT_ID`
-   `VITE_FIREBASE_TESTING_STORAGE_BUCKET`
-   `VITE_FIREBASE_TESTING_MESSAGING_SENDER_ID`
-   `VITE_FIREBASE_TESTING_APP_ID`

<h2>Production</h2>

-   Build the frontend: `npm run build:prod`
-   Build the backend: `npm run build:production`
-   Start built prod app: `npm run start:built-production`

<h3>Backend</h3>

-   `PORT`
-   `MONGODB_PRODUCTION_URI`
-   `FIREBASE_PRODUCTION_PROJECT_ID`
-   `FIREBASE_PRODUCTION_CLIENT_EMAIL`
-   `FIREBASE_PRODUCTION_PRIVATE_KEY_ID`
-   `FIREBASE_PRODUCTION_PRIVATE_KEY`

<h3>Frontend</h3>

-   `VITE_MAPBOX_API`
-   `VITE_FIREBASE_PRODUCTION_API_KEY`
-   `VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN`
-   `VITE_FIREBASE_PRODUCTION_PROJECT_ID`
-   `VITE_FIREBASE_PRODUCTION_STORAGE_BUCKET`
-   `VITE_FIREBASE_PRODUCTION_MESSAGING_SENDER_ID`
-   `VITE_FIREBASE_PRODUCTION_APP_ID`
