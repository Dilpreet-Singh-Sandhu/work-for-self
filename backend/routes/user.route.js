// routes/user.js
import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

// Create a new user
userRouter.post("/create", createUser);

// Update user by ID
userRouter.put("/update:id", updateUser);

// Delete user by ID
userRouter.delete("/delete:id", deleteUser);

export default userRouter;
