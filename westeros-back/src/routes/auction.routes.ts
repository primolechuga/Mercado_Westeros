import { Router } from 'express';
import { createNewAuction, getByUser, getActives, getInfo, searchAuctions } from '../controllers/auctions';
import { userAuth } from '../middlewares/userAuth';



const auctionRouter = Router();

auctionRouter.post('/', userAuth, createNewAuction);

// Rutas no protegidas
auctionRouter.get('/search', searchAuctions); // ← Mover antes de /:userId
auctionRouter.get('/', getActives);
auctionRouter.get('/info/:auctionId', getInfo);

auctionRouter.get('/:userId', userAuth, getByUser); // Ahora está después

export { auctionRouter };