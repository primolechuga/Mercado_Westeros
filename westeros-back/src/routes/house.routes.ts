import { Router } from 'express';
import { getHouse } from '../controllers/house/getHouse.controller';

const houseRouter = Router();

houseRouter.get('/:id', getHouse);

export { houseRouter };