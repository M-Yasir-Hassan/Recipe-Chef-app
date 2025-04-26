import { Router } from "express";
import {registerUser, loginUser, getUserById, updateUserById, getChefs} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)

// Get user details by ID
router.get("/get/:id", getUserById);

// Update user details by ID
router.put("/update/:id", updateUserById);

// Route to get users who have submitted recipes
router.get("/chefs", getChefs);

export default router