import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { houseRouter } from './house.routes';
import { productRouter } from './product.routes';
import { merchantsRouter } from './merchants.routes';
import { Router } from 'express';
import { auctionRouter } from './auction.routes';
import { bidsRouter } from './bids.routes';
// import { userAuth } from '../middlewares/userAuth';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/bids', bidsRouter);
router.use('/house', houseRouter);
router.use('/auction', auctionRouter);
router.use('/product', productRouter);
router.use('/merchants', merchantsRouter);

export { router };