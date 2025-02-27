import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../libs/prisma';
import { AuthenticationError } from '../../errors/authorizationError';


/**
 * Loguea un usuario.
 * 
 * @param {Request} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * 
 * @param {Response} res - El objeto de respuesta.
 * 
 */

export const loginUser = async (req: Request, res: Response, _next: NextFunction) => {

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AuthenticationError('Usuario no encontrado');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AuthenticationError('Usuario no encontrado'); // 'Usuario no encontrado' para mantener la seguridad
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET || 'Secret',
    { expiresIn: '24h' }
  );

  // token = 'Bearer ' + token;
  res.setHeader('authorization', token);
  res.status(200).json({ message: 'Usuario logueado correctamente',
    user: { id: user.id, name: user.name, email: user.email, role : user.role.toLowerCase(), houseId : user.houseId },
  });

};