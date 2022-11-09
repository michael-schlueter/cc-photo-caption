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

userRouter.get("/", isAuthenticated, getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refreshToken", validateRefreshToken);
userRouter.post(":id", revokeRefreshTokens);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
