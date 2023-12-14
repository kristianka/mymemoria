import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fireBaseUid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    // user can favourite a location
    favouriteLocations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location"
        }
    ],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const User = mongoose.model("User", userSchema);
export { User };
