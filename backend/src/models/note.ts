import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    createdAt: {
        type: Date,
        required: true
    },
    // last modified
    modifiedAt: {
        type: Date,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

noteSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Note = mongoose.model("Note", noteSchema);
export { Note };
