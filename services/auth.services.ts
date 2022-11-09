import { PrismaClient } from "@prisma/client";
import { hashToken } from "../utils/hashToken";

const prisma = new PrismaClient();

// Used when creating a new token
// @ts-ignore
export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

// Used when checking if the token sent by the client is in the database
export const findRefreshTokenById = (id: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

// Soft delete token after usage
export const deleteRefreshToken = (id: string) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId: number) => {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};


