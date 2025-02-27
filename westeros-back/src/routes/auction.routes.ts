import { Router } from 'express';
import { createNewAuction } from '../controllers/auctions/create.controller';
import { userAuth } from '../middlewares/userAuth';


const auctionRouter = Router();


auctionRouter.post('/', userAuth, createNewAuction);

export { auctionRouter };