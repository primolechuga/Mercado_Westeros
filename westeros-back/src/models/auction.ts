
import { prisma } from '../libs/prisma';
import { getProduct } from './product';


export const createAuction = async (houseId: number, productId: number, basePrice: number, endDate: Date, quantity :number, userId: string ) => {
  const product = await getProduct(houseId, productId);
  const productStore = await prisma.productStore.findFirst({
    where: {
      houseId,
      productId
    }
  });
  if (!product || !productStore) {
    throw new Error('Product not found');
  }
  if (product.stock - quantity < 0) {
    throw new Error('Product out of stock');
  }
  const auction = await prisma.auction.create({
    data: {
      basePrice,
      endDate,
      productId,
      houseId,
      quantity,
      price: basePrice,
      initialPrice: productStore.price,
      isActive: true,
      increment: 0.1,
      probability: 0.9,
      ownerId: userId,
      winnerId: undefined // No hay ganador al inicio
    }
  }
  );

  await prisma.productStore.update({
    where: {
      houseId_productId: {
        houseId: houseId,
        productId: productId
      }
    },
    data: {
      stock: { decrement: quantity }
    }
  });
  
  return auction;
};

export const getAuction = async (auctionId: number) => {
  const auction = await prisma.auction.findFirst({
    where: {
      id: auctionId
    }
  });
  return auction;
};

export const getActiveAuctions = async (houseId: number) => {
  const auctions = await prisma.auction.findMany({
    where: {
      houseId,
      isActive: true
    }
  });
  return auctions;
};

export const modifyPrice = async (auctionId: number, newPrice: number) => {
  const auction = await prisma.auction.update({
    where: {
      id: auctionId
    },
    data: {
      basePrice: newPrice
    }
  });
  return auction;
};


export const recalculateProbability = async (auctionId: number) => {
  const auction = await prisma.auction.findFirst({
    where: { id: auctionId }
  });

  if (!auction) {
    throw new Error('Auction not found');
  }

  const { increment, probability } = auction;

  // Generamos un aumento aleatorio entre 0.01 y 0.1 (ajustable según necesidad)
  const randomIncrement = Math.random() * 0.1 + 0.01;

  // Reducimos la probabilidad en un porcentaje aleatorio (ej: entre 5% y 15%)
  const randomDecrease = Math.random() * 0.1 + 0.05;

  const newIncrement = increment + randomIncrement;
  const newProbability = Math.max(0, probability - randomDecrease); // Evita valores negativos

  await prisma.auction.update({
    where: { id: auctionId },
    data: {
      increment: newIncrement,
      probability: newProbability
    }
  });

  return { newIncrement, newProbability };
};


export const updateWinner = async (auctionId: number, userId: string) => {
  const auction = await prisma.auction.update({
    where: { id: auctionId },
    data: {
      winnerId: userId,
    }
  });
  return auction;
};

export const closeAuction = async (auctionId: number) => {

  const auction = await prisma.auction.update({
    where: { id: auctionId },
    data: {
      isActive: false
    }
  });
  if (!auction.winnerId) {
    throw new Error('Ganador no encontrado');
  }

  const winner = await prisma.user.findUnique({
    where: { id: auction.winnerId },
    select: {
      id: true,
      houseId: true
    }
  });

  if (!winner) {
    throw new Error('Ganador no encontrado');
  }

  if (!auction) {
    throw new Error('Subasta no encontrada');
  }

  //Actualizamos el stock del producto
  await prisma.productStore.update({
    where: {
      houseId_productId: {
        houseId: winner.houseId,
        productId: auction.productId
      }
    },
    data: {
      stock: { decrement: auction.quantity }
    }
  });

  //calculamos el precio final
  const probability = auction.probability;
  const increment = auction.increment;
  const basePrice = auction.price;
  const initialPrice = auction.initialPrice;

  const random = Math.random();
  let finalPrice = basePrice;

  if (random < probability) {
    finalPrice = basePrice + increment;
  }

  //calculamos la ganacia o perdida de la casa
  const profit = finalPrice - initialPrice;
  //Actualizamos el balance de la casa que compra
  await prisma.house.update({
    where: { id: winner.houseId },
    data: { balance: { increment: profit } }
  }); 

  await prisma.user.update({
    where: { id: winner.id },
    data: { balance: { increment : profit } }
  });

};


