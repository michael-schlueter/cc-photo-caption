import express from "express";

import {
  getAllImages,
  getImage,
  deleteImage,
  createImage,
  updateImage,
} from "../controller/images";
import { isAuthenticated } from "../middleware";

const imageRouter = express.Router();

imageRouter.get("/", getAllImages);
imageRouter.get("/:id", getImage);
imageRouter.post("/", isAuthenticated, createImage);
imageRouter.put("/:id", isAuthenticated, updateImage);
imageRouter.delete("/:id", isAuthenticated, deleteImage);

module.exports = imageRouter;
