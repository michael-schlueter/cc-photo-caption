/*
  Warnings:

  - Added the required column `userId` to the `Caption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caption" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Caption" ADD CONSTRAINT "Caption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
