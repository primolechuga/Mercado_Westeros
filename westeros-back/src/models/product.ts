import { prisma } from '../libs/prisma';

export const getProduct = async (houseId: number, productId: number ) => {
  const product = await prisma.productStore.findFirst({
    where: {
      houseId,
      productId
    },
    select: {
      price: true,
      stock: true,
      product: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
  return product;
};