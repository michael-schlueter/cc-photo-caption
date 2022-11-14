import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

interface INewUser {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUserByEmailAndPassword = (user: INewUser) => {
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


