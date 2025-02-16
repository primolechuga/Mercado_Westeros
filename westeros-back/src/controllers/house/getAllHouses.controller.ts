import { prisma } from '../../libs/prisma';
import { NextFunction, Request, Response } from 'express';

export const getAllHouses = async (req: Request, res: Response, _next : NextFunction ) => {
  const houses = await prisma.house.findMany(
    {
      select: {
        name: true,
        id: true,
      }
    }
  );
    
  res.json(houses);
};