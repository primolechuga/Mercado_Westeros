import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { prisma } from '../../libs/prisma';

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

export const createUser = async (req: Request<User>, res: Response) => {

  const { name, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 12)
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
    
  res.status(201).send('Usuario creado correctamente');

};
