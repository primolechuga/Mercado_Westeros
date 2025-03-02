import { prisma } from '../../libs/prisma';
import { Request, Response } from 'express';

export const getMyBids = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const bids = await prisma.bidHistory.findMany({
    where: {
      userId
    },
    include: {
      Auction: {
        select: {
          id: true,
          basePrice: true,
          endDate: true,
          isActive: true,
          houseId: true,
          price: true,
          product: {
            select: {
              name: true,
              imagePath: true,
              description: true,
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });

  res.json(bids);
};