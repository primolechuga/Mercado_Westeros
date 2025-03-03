import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

/**
 * Elimina un comerciante.
 * 
 * @param {Request} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.params.merchantId - El ID del comerciante.
 * 
 * @param {Response} res - El objeto de respuesta.
 * @param {NextFunction} _next - El siguiente middleware.
 * 
 * @returns {Promise<void>} - El comerciante eliminado.
 * 
 */

export const deleteMerchants = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { merchantId } = req.params;
  console.log(merchantId);
    
  const merchant = await prisma.user.delete({
    where: {
      id: merchantId
    }
  });
    
  res.json(merchant);
    
};