/*
  Warnings:

  - You are about to drop the `Techs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Techs";

-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "technoname" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);
