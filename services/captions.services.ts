import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findCaptionById = (id: number) => {
    return prisma.caption.findUnique({
        where: {
            id: id
        }
    })
}