import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { AuthenticationError } from '../errors/authorizationError';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(404).json({ message: 'Bad Request' });
    return;
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    const errorMessage = err.message.match(/message: "(.*?)"/)?.[1] || 'Bad Request';
    res.status(400).send({ message: errorMessage });
    return;
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).send({ message: 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: err.message.split('\n').at(-1) });
    return;
  }

  if (err instanceof AuthenticationError) {
    res.status(401).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: 'Ha ocurrido un error inesperado' });
};