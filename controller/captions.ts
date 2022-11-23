import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCaption, editCaption, findCaptionById, removeCaption } from "../services/captions.services";
import { findUserById } from "../services/users.services";

const prisma = new PrismaClient();

// @desc    Get all captions
// @route   GET /api/captions
export const getAllCaptions = async (req: Request, res: Response) => {
  try {
    const captions = await prisma.caption.findMany();

    if (captions.length < 1) {
      return res.status(404).send({
        message: "No captions found",
      });
    }

    return res.status(200).send(captions);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get specific caption by id
// @route   GET /api/captions/id
export const getCaption = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const caption = await findCaptionById(parseInt(id));

    if (!caption) {
      return res.status(404).send({
        message: "Caption not found",
      });
    }

    return res.status(200).send(caption);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Create an caption
// @route   POST /api/captions/
export const addCaption = async (req: Request, res: Response) => {
  const { description, imageId } = req.body;
  const userId = req.payload?.userId;

  try {
    if (
      description === "" ||
      description == null ||
      imageId === "" ||
      imageId == null ||
      !userId
    ) {
      return res.status(400).send({
        message: "Description, image ID or user ID missing",
      });
    }

    const newCaption = await createCaption(description, parseInt(imageId), userId)

    return res.status(201).send(newCaption);
  } catch (err: any) {
    if (err.code === "P2003") {
      return res.status(400).send({
        message: "Image id does not exist"
      })
    }
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Update specific caption
// @route   PUT /api/captions/id
export const updateCaption = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;

  try {

    const captionToUpdate = await findCaptionById(parseInt(id));
    const user = await findUserById(req.payload!.userId);

    if (req.payload?.userId !== captionToUpdate?.userId && user?.isAdmin === false) {
      return res.status(403).send({
        message: "Unauthorized to update this caption",
      });
    }

    if (description === "" || description == null) {
      return res.status(400).send({
        message: "Description is missing",
      });
    }

    const updatedCaption = await editCaption(parseInt(id), description);

    if (!updatedCaption) {
      return res.status(404).send({
        message: "Caption not found",
      });
    }

    return res.status(200).send(updatedCaption);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Delete specific caption
// @route   DELETE /api/captions/id
export const deleteCaption = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const captionToDelete = await findCaptionById(parseInt(id));
    const user = await findUserById(req.payload!.userId);

    if (!captionToDelete) {
      return res.status(404).send({
        message: "Caption not found",
      });
    }

    if (req.payload?.userId !== captionToDelete?.userId && user?.isAdmin === false) {
      return res.status(403).send({
        message: "Unauthorized to delete this caption",
      });
    }

    removeCaption(parseInt(id));

    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};
