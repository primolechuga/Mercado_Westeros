-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
