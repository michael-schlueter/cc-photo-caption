import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const findImages = () => {
  return prisma.image.findMany({
    include: {
      captions: true,
    },
  });
};

export const findImageById = (id: number) => {
  return prisma.image.findUnique({
    where: {
      id,
    },
  });
};

export const findImageByIdWithCaptions = (id: number) => {
  return prisma.image.findUnique({
    where: {
      id,
    },
    include: {
      captions: true,
    },
  });
};

export const createImage = (name: string, url: string) => {
  return prisma.image.create({
    data: {
      name: name,
      url: url,
    },
  });
};

export const editImage = (id: number, name: string, url: string) => {
  return prisma.image.update({
    where: {
      id,
    },
    data: {
      name,
      url,
    },
  });
};

export const removeImage = (id: number) => {
  return prisma.image.delete({
    where: {
      id,
    },
  });
};

export const findImageByUrl = (url: string) => {
  return prisma.image.findFirst({
    where: {
      url,
    },
  });
};
