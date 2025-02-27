import { RequiredFieldError } from '../../errors/valadationError';
import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getProductInfo = async (req: Request, res: Response, _next: NextFunction) => {
  const productId = Number(req.params.Id);
  const houseId = Number(req.user.houseId);

  if (!productId || !houseId) {
    
    throw new RequiredFieldError('Faltan campos requeridos');
  }
  console.log(productId, houseId);
  const product = await prisma.productStore.findFirst({
    where: {
      productId: productId,
      houseId: houseId
    },
    select: {
      id: true,
      price: true,
      stock: true,
      product: {
        select: {
          name: true,
          description: true,
          id: true,
        }
      }
    }
  });
  console.log(product);
  if (!product) {
    throw new Error('Producto no encontrado');
  } else {
    res.json(product);
  }
};