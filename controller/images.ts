import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// @desc    Get all images
// @route   GET /api/images
export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.image.findMany({
      include: {
        captions: true,
      },
    });

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
    const image = await prisma.image.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        captions: true,
      },
    });

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
export const createImage = async (req: Request, res: Response) => {
  const { name, url } = req.body;

  try {

    if (url === "" || url == null) {
      return res.status(400).send({
        message: "Image Path is missing",
      });
    }

    const newImage = await prisma.image.create({
      data: {
        name: name,
        url: url,
      },
    });

    return res.status(201).send(newImage);
  } catch (err: any) {
    if (err.meta.target.includes("url")) {
      return res.status(400).send({
        message: "URL already in use"
      })
    }
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

    const updatedImage = await prisma.image.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        url: url,
      },
    });

    if (!updatedImage) {
      return res.status(404).send({
        message: "image not found",
      });
    }

    return res.status(200).send(updatedImage);
  } catch (err: any) {
    if (err.meta.target.includes("url")) {
      return res.status(400).send({
        message: "URL already in use"
      })
    }
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

    const imageToDelete = await prisma.image.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!imageToDelete) {
      return res.status(404).send({
        message: "Image not found",
      });
    }

    await prisma.image.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};
