import { Router } from 'express';
import { createProduct, getByHouse, modifyProducStore  } from '../controllers/product';
import { upload } from '../utils/upload';

const productRouter = Router();

productRouter.post('/:type', upload.single('image'), createProduct);
productRouter.get('/:houseId', getByHouse );
productRouter.put('/:houseId/:productId', modifyProducStore);


export { productRouter };
