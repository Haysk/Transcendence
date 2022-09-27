/*
  Warnings:

  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "fromUserName" TEXT NOT NULL;
