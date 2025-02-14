import { prisma } from '../../libs/prisma';
import { NextFunction, Request, Response } from 'express';

/**
 * Modifica el Tope de la casa.
 * 
 * @param {Request} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.capital - La nueva capital de la casa.
 * @param {string} req.params.houseId - El ID de la casa.
 * 
 * @param {Response} res - El objeto de respuesta.
 * @param {NextFunction} _next - El siguiente middleware.
 * 
 * @returns {Promise<void>} - La capital modificada.
 * 
 */

export const modifyCap = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { cap } = req.body;
  const { houseId } = req.params;

  const house = await prisma.house.update({
    where: {
      id: parseInt(houseId)
    },
    data: {
      cap : parseInt(cap)
    }
  });

  res.json(house);

};