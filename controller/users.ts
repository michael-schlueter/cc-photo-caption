import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length < 1) {
      return res.status(404).send({
        message: "No users found",
      });
    }

    return res.status(200).send(users);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get specific user by id
// @route   GET /api/users/id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    return res.status(200).send(user);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Create an user
// @route   POST /api/users/
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (
      name === "" ||
      name == null ||
      email === "" ||
      email == null ||
      password === "" ||
      password == null
    ) {
      return res.status(400).send({
        message: "Username, email or password is missing",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        isAdmin: false,
      },
    });

    return res.status(201).send(newUser);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Update specific user
// @route   PUT /api/users/id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    if (
      name === "" ||
      name == null ||
      email === "" ||
      email == null ||
      password === "" ||
      password == null
    ) {
      return res.status(400).send({
        message: "Username, email or password is missing",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        email: email,
        password: password,
        isAdmin: false,
      },
    });

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    return res.status(200).send(updatedUser);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
// @desc    Delete specific user
// @route   DELETE /api/users/id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userToDelete = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!userToDelete) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await prisma.user.delete({
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
