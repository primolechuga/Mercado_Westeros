import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { AuthenticationError } from '../errors/authorizationError';
import { prisma } from '../libs/prisma';
const secret = process.env.JWT_SECRET || 'Secret';

/**
 * Middleware que verifica la autenticación del usuario.
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

export const userAuth  = async (req: Request, _res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  console.log(req.headers.authorization);
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

