import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { AuthenticationError } from '../errors/authorizationError';
import { prisma } from '../libs/prisma';
import { User } from '../types/usetType';
const secret = process.env.JWT_SECRET || 'Secret';

/**
 * Guarda el usuario en la solicitud.
 * 
 * @param {Request} req - El objeto de la solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @param {NextFunction} next - El siguiente middleware.
 * 
 * @throws {AuthenticationError} - Si no se encuentra el token o el usuario.
 * 
 * @returns {Promise<void>} - El siguiente middleware.
 * 
 */

export interface RequestWithUser extends Request {
  user: User;
}

export const saveUser = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Token no encontrado');
  }
  const verified = jwt.verify(token, secret) as JwtPayload;
  const userFound = await prisma.user.findUnique({ where: { id: verified.id } });
  if (!userFound) {
    throw new AuthenticationError('Usuario no encontrado');
  }

  req.user = userFound;
  next();

};

