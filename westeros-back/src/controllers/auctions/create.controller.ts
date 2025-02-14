// import { NextFunction, Request, Response } from 'express';
// import { prisma } from '../../libs/prisma';

// /**
//  * Crea una subasta.
//  * 
//  * @param {Request} req - El objeto de la solicitud.
//  * @param {Object} req.body - El cuerpo de la solicitud.
//  * @param {string} req.body.productId - El ID del producto.
//  * @param {number} req.body.price - El precio inicial de la subasta.
//  * @param {string} req.body.endDate - La fecha de finalización de la subasta.
//  * 
//  * @param {Response} res - El objeto de respuesta.
//  * @param {NextFunction} _next - El siguiente middleware.
//  * 
//  * @returns {Promise<void>} - La subasta creada.
//  * 
//  */
// //TODO 
// export const createAuction = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
//   const { productId, price, endDate } = req.body;

//   const newAuction = await prisma.auction.create({
//     data: {
//       basePrice: price,
//       endDate,
//       productId,

//     }
//   });

//   res.status(201).json(newAuction);


