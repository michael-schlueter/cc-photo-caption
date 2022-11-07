import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// @ts-ignore
const createUserByEmailAndPassword = (user) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
};

const findUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
};
