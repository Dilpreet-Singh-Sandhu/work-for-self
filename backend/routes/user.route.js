// routes/user.js
import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

// Create a new user
userRouter.post("/create", createUser);

//login user
userRouter.post("/login", loginUser);

// Update user by ID
userRouter.put("/update/:id", updateUser);

// Delete user by ID
userRouter.delete("/delete:id", deleteUser);

export default userRouter;
