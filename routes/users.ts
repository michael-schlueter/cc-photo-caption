import express from "express";
import { isAuthenticated } from "../middleware";

import {
  getAllUsers,
  getUser,
  deleteUser,
  registerUser,
  updateUser,
  loginUser,
  validateRefreshToken,
  revokeRefreshTokens,
} from "../controller/users";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refreshToken", isAuthenticated, validateRefreshToken);
userRouter.post(":id", isAuthenticated, revokeRefreshTokens);
userRouter.put("/:id", isAuthenticated, updateUser);
userRouter.delete("/:id", isAuthenticated, deleteUser);

module.exports = userRouter;
