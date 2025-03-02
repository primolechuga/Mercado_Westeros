import { Router } from 'express';
import { modifyCap, getHouse, getMyHouse, getAllHouses } from '../controllers/house';

const houseRouter = Router();

//General
houseRouter.get('/', getAllHouses);


houseRouter.get('/:id', getHouse);
houseRouter.get('/myHouse', getMyHouse);

//Maestre
houseRouter.put('/:houseId', modifyCap);

export { houseRouter };