import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

const connectToMongo = () => {
    console.log("Connecting to MongoDB...");
    mongoose
        .connect(MONGODB_URI)
        .then((_res) => {
            console.log("Successfully connected to MongoDB!");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};

export { connectToMongo };
