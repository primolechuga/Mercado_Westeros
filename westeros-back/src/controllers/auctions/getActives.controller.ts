import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getActives = async (req: Request, res: Response, _next: NextFunction) => {
  const { orderBy } = req.query; // Recibe el parámetro de orden
  
  const orderOptions: Record<string, object | undefined> = {
    price: { price: 'asc' as const },   // Ordena por menor precio
    date: { endDate: 'asc' as const },   // Ordena por menor fecha de finalización
    quantity: { quantity: 'asc' as const } // Ordena por menor cantidad
  };
  
  const auctions = await prisma.auction.findMany({
    where: { isActive: true },
    include: {
      product: {
        select: {
          name: true,
          description: true,
          imagePath: true,
          id: true
        }
      }
    },
    orderBy: orderOptions[orderBy as string] || undefined
  });
  
  res.json(auctions);
};
  