import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 1000
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const PostModel = mongoose.model("Post", postSchema);

