import express from "express";

import {
  getAllImages,
  getImage,
  deleteImage,
  createImage,
  updateImage,
} from "../controller/images";

const imageRouter = express.Router();

imageRouter.get("/", getAllImages);
imageRouter.get("/:id", getImage);
imageRouter.post("/", createImage);
imageRouter.put("/:id", updateImage);
imageRouter.delete("/:id", deleteImage);

module.exports = imageRouter;
