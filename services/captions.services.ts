import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findCaptionById = (id: number) => {
    return prisma.caption.findUnique({
        where: {
            id
        }
    })
}

export const createCaption = (description: string, imageId: number, userId: number) => {
    return prisma.caption.create({
        data: {
            description,
            imageId,
            userId
        }
    })
}

export const editCaption = (id: number, description: string) => {
    return prisma.caption.update({
        where: {
            id,
          },
          data: {
            description,
          },
    })
}

export const removeCaption = (id: number) => {
    return prisma.caption.delete({
        where: {
            id
        }
    })
}