# 🍽️ RecipeHub - A MERN Stack Recipe Sharing Platform

RecipeHub is a full-stack web application where users can **register/login**, **create** and **manage recipes**, **save** others' recipes, **comment** on recipes, and **update their profiles**.  
Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with **Vite** for an optimized frontend development experience and **MongoDB Atlas** for cloud database management.

---

## ✨ Features

- **Authentication**
  - Register with username, email, and password
  - Login with email and password
- **Recipe Management**
  - View a list of all recipes on the homepage
  - Create your own recipes
  - Edit or Delete your own recipes
- **Save Recipes**
  - Save other users' recipes
  - Unsave recipes
- **Comments**
  - Add comments on any recipe
- **Profile Management**
  - Update username, email, or password

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite, Axios, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
- **Other Tools:** Vite, dotenv, CORS, Multer (if image upload), Postman (for testing)

---





## Create a .env file inside backend directory and add:
-PORT=3001
-MONGO_URI=your_mongodb_atlas_connection_string
-JWT_SECRET=your_secret_key
