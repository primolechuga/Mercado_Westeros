/*
  Warnings:

  - The primary key for the `productStore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `productStore` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.
  - Added the required column `productId` to the `productStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productStore" DROP CONSTRAINT "productStore_pkey",
DROP COLUMN "id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "productStore_pkey" PRIMARY KEY ("houseId", "productId");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isVerified",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "productStore" ADD CONSTRAINT "productStore_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
