import express from "express";
import { isAuthenticated } from "../middleware";

import {
  getAllCaptions,
  getCaption,
  deleteCaption,
  createCaption,
  updateCaption,
} from "../controller/captions";

const captionRouter = express.Router();

captionRouter.get("/", getAllCaptions);
captionRouter.get("/:id", getCaption);
captionRouter.post("/", isAuthenticated, createCaption);
captionRouter.put("/:id", updateCaption);
captionRouter.delete("/:id", deleteCaption);

module.exports = captionRouter;
