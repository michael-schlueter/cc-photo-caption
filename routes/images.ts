import express from "express";

import {
  getAllImages,
  getImage,
  deleteImage,
  addImage,
  updateImage,
} from "../controller/images";
import { isAuthenticated, isAdmin } from "../middleware";

const imageRouter = express.Router();

imageRouter.get("/", getAllImages);
imageRouter.get("/:id", getImage);
imageRouter.post("/", isAuthenticated, isAdmin, addImage);
imageRouter.put("/:id", isAuthenticated, isAdmin, updateImage);
imageRouter.delete("/:id", isAuthenticated, isAdmin, deleteImage);

module.exports = imageRouter;
