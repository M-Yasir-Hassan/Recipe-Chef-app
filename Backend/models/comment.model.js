import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Comment = mongoose.model("Comment", CommentSchema);