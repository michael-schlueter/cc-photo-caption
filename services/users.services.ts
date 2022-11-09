import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// @ts-ignore
export const createUserByEmailAndPassword = (user) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};


