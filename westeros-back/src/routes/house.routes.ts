import { Router } from 'express';
import { modifyCap, getHouse, getMyHouse } from '../controllers/house';

const houseRouter = Router();

houseRouter.get('/:id', getHouse);
houseRouter.put('/:id', modifyCap);
houseRouter.get('/myHouse', getMyHouse);


export { houseRouter };