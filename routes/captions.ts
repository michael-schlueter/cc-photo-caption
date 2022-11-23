import express from "express";
import { isAuthenticated } from "../middleware";

import {
  getAllCaptions,
  getCaption,
  deleteCaption,
  addCaption,
  updateCaption,
} from "../controller/captions";

const captionRouter = express.Router();

captionRouter.get("/", getAllCaptions);
captionRouter.get("/:id", getCaption);
captionRouter.post("/", isAuthenticated, addCaption);
captionRouter.put("/:id", isAuthenticated, updateCaption);
captionRouter.delete("/:id", isAuthenticated, deleteCaption);

module.exports = captionRouter;
