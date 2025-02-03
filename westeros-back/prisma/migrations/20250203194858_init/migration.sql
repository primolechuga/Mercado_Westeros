-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MERCADER', 'MAESTRE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MERCADER';
