import { prisma } from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';

export const getMerchants = async (req: Request, res: Response, _next: NextFunction) => {
  const houseId = Number(req.params.houseId);
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

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
    },
    skip: skip,
    take: pageSize
  });

  const totalMerchants = await prisma.user.count({
    where: {
      role: 'MERCADER',
      houseId: houseId
    }
  });

  res.json({
    data: merchants,
    total: totalMerchants,
    page: page,
    pageSize: pageSize
  });
};
