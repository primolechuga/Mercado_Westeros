import { AuthorizationError } from '../../errors';
import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getByUser = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const userId = req.user.id;
  if (userId !== req.params.userId) {
    throw new AuthorizationError('No puedes ver las subastas de otro usuario');
  }
  
  const auctions = await prisma.auction.findMany({
    where: {
      ownerId: userId
    },
    select: {
      id: true,
      basePrice: true,
      endDate: true,
      probability: true,
      isActive: true,
      winnerId: true,
      product: {
        select: {
          name: true,
          imagePath: true,
          id: true,
          description: true
        }
      }
    }
  });
  res.json(auctions);
};