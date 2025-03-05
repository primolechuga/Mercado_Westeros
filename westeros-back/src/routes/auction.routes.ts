import { Router } from 'express';
import { createNewAuction, getByUser, getActives, getInfo, searchAuctions, getWons } from '../controllers/auctions';
import { userAuth } from '../middlewares/userAuth';



const auctionRouter = Router();

auctionRouter.post('/', userAuth, createNewAuction);

// Rutas no protegidas
auctionRouter.get('/wons/:userId', userAuth, getWons);
auctionRouter.get('/search', searchAuctions); 
auctionRouter.get('/', getActives);
auctionRouter.get('/info/:auctionId', getInfo);

auctionRouter.get('/:userId', userAuth, getByUser);

export { auctionRouter };