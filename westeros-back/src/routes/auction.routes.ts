import { Router } from 'express';
import { createNewAuction, getByUser, getActives, getInfo } from '../controllers/auctions';
import { userAuth } from '../middlewares/userAuth';



const auctionRouter = Router();

auctionRouter.post('/', userAuth, createNewAuction);
auctionRouter.get('/:userId', userAuth, getByUser);

//Rutas no protegidas
auctionRouter.get('/', getActives);
auctionRouter.get('/info/:auctionId', getInfo);

export { auctionRouter };