import { prisma } from '../../libs/prisma';
import { NextFunction, Request, Response } from 'express';

export const getHouse = async (req: Request, res: Response, next : NextFunction ) => {
  const { id } = req.params;
  try {
    const house = await prisma.house.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    
    res.json(house);
        
  } catch (error) {
    
    next(error);
    
  }
};