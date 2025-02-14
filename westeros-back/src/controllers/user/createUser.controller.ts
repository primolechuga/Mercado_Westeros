import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../libs/prisma';
import { hashPassword } from '../../utils/hashPassword';

/**
 * Crea un usuario.
 * 
 * @param {Request} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.name - El nombre del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * 
 * @param {Response} res - El objeto de respuesta.
 * 
 * 
 */
export const createUser = async (req: Request, res: Response) => {

  const { name, email, password, houseId } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      houseId,
      role: 'MERCADER',
      password: await hashPassword(password),
    }
  });

  if (newUser) {
    let token = jwt.sign(
      { id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      process.env.JWT_SECRET || 'Secret',
      {
        expiresIn: '24h',
      }
    );
    token = 'Bearer ' + token;
    res.header('authorization', token);
  }

  res.status(201).json({ message: 'Usuario creado correctamente',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role.toLowerCase() },
  });

};
