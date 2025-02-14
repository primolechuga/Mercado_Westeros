import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getMerchants = async (req: Request, res: Response, _next: NextFunction) => {
  
  const houseId = Number(req.params.houseId);
  const merchants = await prisma.user.findMany({
    where: {
      role: 'MERCADER',
      houseId: houseId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      balance: true
    }
  });
  res.json(merchants);

};
