import { Request, Response, NextFunction } from 'express';
import { createBid } from '../../models/bid';

export const createNewBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, auctionId, userId } = req.body;
    const houseId = req.user.houseId;
    await createBid(amount, auctionId, userId, houseId);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};