import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js"
import commentRoute from "./routes/comment.route.js";
import morgan from "morgan";
const app = express()

app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend URL
app.use(morgan('dev'));

app.use(express.json({ limit: "900kb" }));
app.use(express.urlencoded({ extended: true, limit: "900kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes



// routes declaration

app.use("/api/v1/users", userRoute);
app.use("/api/v1/recipe/", recipeRoute);
app.use("/api/v1/comments", commentRoute);

// Handle not found routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

export { app }