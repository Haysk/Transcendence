/*
  Warnings:

  - You are about to drop the column `technoname` on the `Tech` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tech` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Tech` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tech_technoname_key";

-- AlterTable
ALTER TABLE "Tech" DROP COLUMN "technoname",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "details" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");
