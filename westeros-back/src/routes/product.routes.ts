import { Router } from 'express';
import { createProduct, getByHouse, modifyProducStore, getProductInfo  } from '../controllers/product';
import { userAuth } from '../middlewares/userAuth';
import { upload } from '../utils/upload';

const productRouter = Router();

productRouter.post('/:type', upload.single('image'), createProduct);
productRouter.get('/:houseId', getByHouse );
productRouter.get('/info/:Id', userAuth, getProductInfo);
productRouter.put('/:houseId/:productId', modifyProducStore);


export { productRouter };
