import { prisma } from '../../libs/prisma';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../middlewares/userAuth';


/**
 * Obtiene los productos de una casa.
 * 
 * @param {RequestWithUser} req - El objeto de la solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @param {NextFunction} _next - El siguiente middleware.
 * 
 * @returns {Promise<void>} - Los productos de la casa.
 * 
 */

//Este controlador debe usar el middleware para verificar la casa
export const getByHouse = async (req: RequestWithUser, res: Response, _next : NextFunction ): Promise<void> => {
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
    }
  });

  res.json(products);

};