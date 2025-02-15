import { prisma } from '../../libs/prisma';
import { NextFunction, Response, Request } from 'express';

//Este controlador debe usar el middleware para verificar la casa
export const getByHouse = async (req: Request, res: Response, _next: NextFunction) => {
  const houseId = Number(req.params.houseId);
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

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
    skip,
    take: pageSize
  });

  const totalProducts = await prisma.productStore.count({
    where: {
      houseId
    }
  });

  res.json({
    totalProducts,
    totalPages: Math.ceil(totalProducts / pageSize),
    currentPage: page,
    products
  });
};