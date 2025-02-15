import { Response, NextFunction, Request } from 'express';
import { AuthorizationError } from '../errors/authorizationError';

/**
 * Verifica que la casa de la solicitud sea la misma que la del usuario.
 * 
 * @param {RequestWithUser} req - El objeto de la solicitud.
 * @param {Response} _res - El objeto de respuesta.
 * @param {NextFunction} next - El siguiente middleware.
 * 
 * @returns {void} - Nada.
 * 
 */

export const checkHouse = (req: Request, _res: Response, next: NextFunction): void => {
  const houseParams = Number(req.params.houseId);
  const { houseId } = req.user;

  if (houseParams !== houseId) {
    throw new AuthorizationError('No tienes permiso para realizar esta acción');
  }

  next();
};
