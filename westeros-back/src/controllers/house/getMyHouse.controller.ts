import { prisma } from '../../libs/prisma';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../middlewares/userAuth';

export const getMyHouse = async (req: RequestWithUser, res: Response, _next : NextFunction ) => {
  const user = req.user;
  const house = await prisma.user.findUnique({ where: { id: user.id } });
  res.json(house?.houseId);
};
