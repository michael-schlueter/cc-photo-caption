import express from "express";

import { getAllUsers, getUser } from "../controller/users";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);

module.exports = userRouter;
