import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to add a comment to a recipe
export const addComment = asyncHandler(async (req, res) => {
    const { recipeId, userId, comment } = req.body;

    console.log("Request Body:", req.body);

    const newComment = await Comment.create({ recipeId, userId, comment });
    res.status(201).json({ data: newComment });
});

// Controller to get comments for a recipe
export const getComments = asyncHandler(async (req, res) => {
    const { recipeId } = req.params;

    const comments = await Comment.find({ recipeId }).populate("userId", "username");
    res.status(200).json({ data: comments });
});

// Controller to delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json({ message: "Comment deleted successfully" });
});