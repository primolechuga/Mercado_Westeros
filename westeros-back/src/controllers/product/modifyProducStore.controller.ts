import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

//TODO si queremos modificar mas cosas tenemos que cambiar el modelo
export const modifyProducStore = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {

  const { price, stock } = req.body;
  const { houseId, productId } = req.params;
    
  const productStore = await prisma.productStore.update({
    where: {
      houseId_productId: {
        houseId: parseInt(houseId),
        productId: parseInt(productId)
      }
    },
    data: {
      price: parseInt(price),
      stock: parseInt(stock)
    }
  });
    
  res.json(productStore);
    
};