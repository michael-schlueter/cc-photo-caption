-- DropForeignKey
ALTER TABLE "Caption" DROP CONSTRAINT "Caption_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Caption" DROP CONSTRAINT "Caption_userId_fkey";

-- AddForeignKey
ALTER TABLE "Caption" ADD CONSTRAINT "Caption_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caption" ADD CONSTRAINT "Caption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
