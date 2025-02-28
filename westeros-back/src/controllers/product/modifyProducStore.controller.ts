import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

//TODO si queremos modificar mas cosas tenemos que cambiar el modelo
export const modifyProducStore = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {

  const { price, stock } = req.body;
  const { productId, houseId } = req.params;
  // /product/{houseId}/{:productId}
  const productStore = await prisma.productStore.updateMany({
    where: {
      productId: parseInt(productId),
      houseId: parseInt(houseId)
    },
    data: {
      price: parseInt(price),
      stock: parseInt(stock)
    }
  });
    
  res.json(productStore);
    
};