/*
  Warnings:

  - A unique constraint covering the columns `[technoname]` on the table `Tech` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tech" ALTER COLUMN "category" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tech_technoname_key" ON "Tech"("technoname");
