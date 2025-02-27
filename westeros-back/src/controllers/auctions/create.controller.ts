import { NextFunction, Request, Response } from 'express';
import { createAuction } from '../../models/auction';


export const createNewAuction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { productId, basePrice, endDate, quantity } = req.body;
  const userId = req.user.id;

  try {
    const auction = await createAuction(req.user.houseId, productId, basePrice, endDate, quantity, userId);
    res.status(201).json(auction);

  } catch (error) {
    console.log(error);

    next(error);

  }

};
  
    




