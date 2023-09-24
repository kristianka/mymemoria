import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String
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
        // important to delete this!!!
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);
export { User };
