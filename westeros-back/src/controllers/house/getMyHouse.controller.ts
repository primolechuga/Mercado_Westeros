import { prisma } from '../../libs/prisma';
import { NextFunction, Response, Request  } from 'express';


export const getMyHouse = async (req: Request, res: Response, _next : NextFunction ) => {
  const user = req.user;
  const house = await prisma.user.findUnique({ where: { id: user.id } });
  res.json(house?.houseId);
};
