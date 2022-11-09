import express from "express";

import {
  getAllUsers,
  getUser,
  deleteUser,
  registerUser,
  updateUser,
} from "../controller/users";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", registerUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
