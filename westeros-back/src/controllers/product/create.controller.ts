import { prisma } from '../../libs/prisma';
import { NextFunction, Request, Response } from 'express';


//TODO agregar la insercion al inventario
export const createProduct = async (req: Request, res: Response, next : NextFunction ) => {
  const { name, description, } = req.body;
  const imageUrl = `/uploads/products/${req.file?.filename}`;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        imagePath : imageUrl,
      }
    });

    res.json(product);
    
  } catch (error) {

    next(error);

  }
};