import express from "express";

import {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
} from "../controller/users";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
