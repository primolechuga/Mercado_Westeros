import { prisma } from '../../libs/prisma';
import  { NextFunction, Request, Response } from 'express';

const baseUrl = process.env.BASE_URL || 'http://localhost:4000'; // URL base del back-end

//TODO agregar la insercion al inventario
export const createProduct = async (req: Request, res: Response, next : NextFunction ) => {
  const { name, description, houseId, stock, basePrice } = req.body;
  const imageUrl = `${baseUrl}/uploads/products/${req.file?.filename}`;
  console.log(imageUrl); 
  console.log(req.body);
  if (isNaN(houseId) || isNaN(stock) || isNaN(basePrice)) {
    res.status(400).json({ error: 'Datos inválidos.' });
  }
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        imagePath: imageUrl,
      },
    });

    const newInventory = await prisma.productStore.create({
      data: {
        productId: newProduct.id,
        stock: Number(req.body.stock),
        price: Number(req.body.basePrice),
        houseId: Number(req.body.houseId),
      }
    });
    console.log(newProduct);
    console.log(newInventory);

    res.status(201).json({ product: newProduct, inventory: newInventory });
    
  } catch (error) {
    console.error('Error creating product', error);

    next(error);

  }
};

