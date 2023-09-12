import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? (process.env.TEST_MONGODB_URI as string)
        : (process.env.MONGODB_URI as string);

export { MONGODB_URI, PORT };
