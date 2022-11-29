import { Request, Response } from "express";
import {
  addToCache,
  removeFromCache,
  retrieveFromCache,
} from "../services/cache.services";
import {
  createImage,
  editImage,
  findImageByIdWithCaptions,
  findImageByUrl,
  findImages,
  removeImage,
} from "../services/images.services";

// @desc    Get all images
// @route   GET /api/images
export const getAllImages = async (req: Request, res: Response) => {
  try {
    // Retrieve images from cache or from database if they are not yet cached
    let images = retrieveFromCache("images");

    if (!images) {
      images = await findImages();
      addToCache("images", images);
    }

    if (images.length < 1) {
      return res.status(404).send({
        message: "No images found",
      });
    }

    return res.status(200).send(images);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get specific image by id
// @route   GET /api/images/id
export const getImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const image = await findImageByIdWithCaptions(parseInt(id));

    if (!image) {
      return res.status(404).send({
        message: "image not found",
      });
    }

    return res.status(200).send(image);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Create an Image
// @route   POST /api/images/
export const addImage = async (req: Request, res: Response) => {
  const { name, url } = req.body;

  try {
    if (url === "" || url == null) {
      return res.status(400).send({
        message: "Image Path is missing",
      });
    }

    const existingImage = await findImageByUrl(url);

    if (existingImage) {
      return res.status(400).send({
        message: "Image URL already exists",
      });
    }

    const newImage = await createImage(name, url);
    removeFromCache("images");

    return res.status(201).send(newImage);
  } catch (err: any) {
    return res.status(500).send({
      message: err,
    });
  }
};

// @desc    Update specific image
// @route   PUT /api/images/id
export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, url } = req.body;

  try {
    if (url === "" || url == null) {
      return res.status(400).send({
        message: "Image path is missing",
      });
    }

    const existingImage = await findImageByUrl(url);

    if (existingImage) {
      return res.status(400).send({
        message: "Image URL already exists",
      });
    }

    const updatedImage = await editImage(parseInt(id), name, url);

    if (!updatedImage) {
      return res.status(404).send({
        message: "image not found",
      });
    }

    removeFromCache("images");

    return res.status(201).send(updatedImage);
  } catch (err: any) {
    return res.status(500).send({
      message: err,
    });
  }
};

// @desc    Delete specific image
// @route   DELETE /api/images/id
export const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await removeImage(parseInt(id));
    removeFromCache("images");

    res.sendStatus(204);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).send({
        message: "Image to delete does not exist",
      });
    }
    return res.status(500).send({
      message: err.message,
    });
  }
};
