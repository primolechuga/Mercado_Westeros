import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

//TODO si queremos modificar mas cosas tenemos que cambiar el modelo
export const modifyProducStore = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {

  const { price, stock } = req.body;
  const { productStoreId } = req.params;
    
  const productStore = await prisma.productStore.update({
    where: {
      id: parseInt(productStoreId),
    },
    data: {
      price: parseInt(price),
      stock: parseInt(stock)
    }
  });
    
  res.json(productStore);
    
};