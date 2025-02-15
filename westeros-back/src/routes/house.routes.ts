import { Router } from 'express';
import { getHouse } from '../controllers/house/getHouse.controller';
import { modifyCap } from '../controllers/house';

const houseRouter = Router();

houseRouter.get('/:id', getHouse);
houseRouter.put('/:id', modifyCap);

export { houseRouter };