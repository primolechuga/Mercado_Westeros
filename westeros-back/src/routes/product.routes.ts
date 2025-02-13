import { Router } from 'express';
import { createProduct  } from '../controllers/product';
import { upload } from '../utils/upload';

const productRouter = Router();

productRouter.post('/:type', upload.single('image'), createProduct);

export { productRouter };
