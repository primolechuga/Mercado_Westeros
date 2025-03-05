import { AuthorizationError } from '../../errors';
import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getWons = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  if (userId !== req.user.id) {
    throw new AuthorizationError('No tienes permisos para ver las subastas ganadas de otro usuario');
  }
  try {
    const wons = await prisma.auction.findMany({
      where: {
        winnerId: userId,
        isActive: false,
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
    res.json(wons);
  } catch (error) {
    next(error);
  }
};