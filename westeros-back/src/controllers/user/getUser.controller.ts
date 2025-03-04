import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

