import { Request, Response, NextFunction } from 'express';
import { createBid } from '../../models/bid';
import { RequiredFieldError } from '../../errors';

export const createNewBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, auctionId } = req.body;
    const houseId = req.user.houseId;
    const userId = req.user.id;
    if (!amount || !auctionId ) {
      throw new RequiredFieldError('La oferta y la subasta son requeridas');
    }
    await createBid(amount, auctionId, userId, houseId);
    res.status(201).send({ message: 'Oferta creada' });
  } catch (error) {
    next(error);
  }
};