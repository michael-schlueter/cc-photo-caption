import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

interface INewUser {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export const findUsers = () => {
  return prisma.user.findMany({
    include: {
      captions: true,
    },
  });
};

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

export const findUserByIdWithCaptions = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      captions: true,
    },
  });
};

export const editUser = (id: number, email: string, password: string) => {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email,
      password: bcrypt.hashSync(password, 12),
      isAdmin: false,
    },
  });
};

export const removeUser = (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validatePassword = (password: string) => {
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
};
