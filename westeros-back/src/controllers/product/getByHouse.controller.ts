import { prisma } from '../../libs/prisma';
import { NextFunction, Response, Request } from 'express';

//Este controlador debe usar el middleware para verificar la casa
export const getByHouse = async (req: Request, res: Response, _next: NextFunction) => {
  const houseId = Number(req.params.houseId);

  const products = await prisma.productStore.findMany({
    where: {
      houseId
    },
    select: {
      price: true,
      stock: true,
      product: {
        select: {
          id: true,
          name: true,
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  });


  res.json({ products });
};