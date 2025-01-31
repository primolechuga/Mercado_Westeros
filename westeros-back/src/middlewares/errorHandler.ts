import { NextFunction, Request, Response, } from 'express';
import { Prisma } from '@prisma/client';
// import { ValidationError, InvalidFieldError, OutOfRangeError, NotFoundError, RequiredFieldError, AuthenticationError } from '../errors';
import { AuthenticationError } from '../errors/authorizationError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(404).json({ message: 'Bad Request' });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    const errorMessage = err.message.match(/message: "(.*?)"/)?.[1] || 'Bad Request';
    res.status(400).send({ message : errorMessage });
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(400).send({ message : 'Bad Request' });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: err.message.split('\n').at(-1) });
  }

  // if (err instanceof ValidationError) {
  //   return res.status(400).send({ message: err.message });
  // }
  
  // if (err instanceof InvalidFieldError) {
  //   return res.status(400).send({ message: err.message });
  // }

  // if (err instanceof OutOfRangeError) {
  //   return res.status(400).send({ message: err.message });
  // }

  // if (err instanceof NotFoundError) {
  //   return res.status(404).send({ message: err.message });
  // }

  // if (err instanceof RequiredFieldError) {
  //   return res.status(400).send({ message: err.message });
  // }

  if (err instanceof AuthenticationError) {
    res.status(401).send({ message: err.message });
  }

  res.status(500).send({ message : 'Ha ocurrido un error inesperado' });
};
