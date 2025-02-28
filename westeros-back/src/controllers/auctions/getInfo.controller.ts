import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getInfo = async (req: Request, res: Response, _next: NextFunction) => {
  const { auctionId } = req.params;
  const auction = await prisma.auction.findFirst({
    where: {
      id: parseInt(auctionId)
    },
    include: {
      product: {
        select: {
          name: true,
          description: true,
          imagePath: true,
          id: true
        }
      }
    }
  });
  res.json(auction);
};
    