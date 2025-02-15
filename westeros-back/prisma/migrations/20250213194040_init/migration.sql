/*
  Warnings:

  - Added the required column `cap` to the `house` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `house` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "house" ADD COLUMN     "cap" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "imagePath" TEXT NOT NULL;
