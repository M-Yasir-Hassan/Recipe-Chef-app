import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

// Route to add a comment to a recipe
router.post("/add", addComment);

// Route to get comments for a recipe
router.get("/:recipeId", getComments);

// Route to delete a comment
router.delete("/:commentId", deleteComment);

export default router;