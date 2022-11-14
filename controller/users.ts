import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "../services/auth.services";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "../services/users.services";
import { generateTokens } from "../utils/jwt";
import { hashToken } from "../utils/hashToken";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        captions: true,
      },
    });

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
      include: {
        captions: true,
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
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send({
        message: "You must provide an email and a password",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).send({
        message: "Email already in use.",
      });
    }

    const user = await createUserByEmailAndPassword({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send({
        message: "You must provide an email and a password",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403).send("Invalid login credentials");
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!validPassword) {
      res.status(403).send({
        message: "Invalid login credentials",
      });
    }

    const jti = uuidv4();
    // @ts-ignore
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser?.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
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
  const { email, password } = req.body;

  try {
    if (email === "" || email == null || password === "" || password == null) {
      return res.status(400).send({
        message: "Email or password is missing",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
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

// @desc    Validate and delete/renew refresh token
// @route   POST /api/users/refreshToken
export const validateRefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      res.status(400).send("Missing refresh token");
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return res.status(401).send("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken?.hashedToken) {
      return res.status(401).send("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens (e.g. password reset)
// @desc    Revoke refresh token for a specific user
// @route   POST /api/users/id
export const revokeRefreshTokens = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};
