import { Router } from 'express';
import { getMerchants, deleteMerchants } from '../controllers/merchants';

const merchantsRouter = Router();

merchantsRouter.get('/:houseId', getMerchants);
merchantsRouter.delete('/:merchantId', deleteMerchants);

export { merchantsRouter };