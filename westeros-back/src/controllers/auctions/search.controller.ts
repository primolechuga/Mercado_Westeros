import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../libs/prisma';

export const searchAuctions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;

    // Se filtran solo las subastas activas y, si se pasó el parámetro query, se filtra el nombre del producto
    const auctions = await prisma.auction.findMany({
      where: {
        isActive: true,
        product: query
          ? {
            name: {
              contains: query as string,
              mode: 'insensitive', // Ignora mayúsculas/minúsculas
            },
          }
          : undefined,
      },
      include: {
        product: {
          select: {
            name: true,
            description: true,
            imagePath: true,
            id: true,
          },
        },
      },
    });
    

    res.json(auctions);
  } catch (error) {
    next(error);
  }
};
