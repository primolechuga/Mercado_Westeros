import { prisma } from '../../libs/prisma';
import { NextFunction, Request, Response } from 'express';

export const getHouse = async (req: Request, res: Response, _next : NextFunction ) => {
  const { id } = req.params;

  const house = await prisma.house.findUnique({
    where: {
      id: parseInt(id)
    }
  });
    
  res.json(house);
};