// import { prisma } from '../../libs/prisma';
// import { NextFunction, Request, Response } from 'express';


// export const createProduct = async (req: Request, res: Response, next : NextFunction ) => {
//   const { name, description, } = req.body;
//   try {
//     const product = await prisma.product.create({
//       data: {
//         name,
//         description,
//       }
//     });

//     res.json(product);
    
//   } catch (error) {

//     next(error);

//   }
// };