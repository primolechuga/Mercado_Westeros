import { getMyBids, createNewBid } from '../controllers/bids';
import { userAuth } from '../middlewares/userAuth';
import { Router } from 'express';

const bidsRouter = Router();

//Rutas protegidas
bidsRouter.post('/', userAuth, createNewBid);
bidsRouter.get('/:userId', userAuth, getMyBids);

export { bidsRouter };