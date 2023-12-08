import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    // sadly can't prefetch address, city etc due to mapbox api terms
    // need to request them on get request every time on frontend
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere" // create a geospatial index
    }
});

locationSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Location = mongoose.model("Location", locationSchema);
export { Location };
