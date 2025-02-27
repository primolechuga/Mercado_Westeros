import { Router } from 'express';
import { createNewAuction, getByUser } from '../controllers/auctions';
import { userAuth } from '../middlewares/userAuth';


const auctionRouter = Router();

auctionRouter.post('/', userAuth, createNewAuction);
auctionRouter.get('/:userId', userAuth, getByUser);

export { auctionRouter };