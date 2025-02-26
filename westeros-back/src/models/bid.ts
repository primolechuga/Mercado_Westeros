import { prisma } from '../libs/prisma';
import { getAuction, updateWinner, recalculateProbability, modifyPrice } from './auction';



export const createBid = async ( amount : number, auctionId: number, userId: string, houseId: number) => {

  const [house, auction] = await Promise.all([
    prisma.house.findFirst({ where: { id: houseId } }),
    getAuction(auctionId)
  ]);

  if (!auction || !house) {
    throw new Error('Subasta o casa no encontrada');
  }

  if (auction.endDate < new Date() || !auction.isActive) {
    throw new Error('La subasta ha finalizado');
  }

  if (amount < auction.basePrice &&  amount < house.cap) {
    throw new Error('La oferta debe ser mayor al precio base');
  }

  if (amount > house.cap) {
    throw new Error('No puedes ofertar más de lo que tienes');
  }


  if (auction.houseId === houseId) {
    throw new Error('No puedes ofertar en tu propia subasta');
  }
  //Actualizamos el historial de ofertas
  const previousWinner = await prisma.bidHistory.updateMany({
    where: {
      auctionId,
      isWinner: true//Solo debe haber un ganador
    },
    data: {
      isWinner: false
    }
  });

  if (previousWinner) {
    //TODO enviar notificación al usuario
  }
  await Promise.all([
    await prisma.bidHistory.create({
      data: {
        amount,
        auctionId,
        userId,
        isWinner: true,
        date : new Date()
      }
    }),

    updateWinner(auctionId, userId),

    recalculateProbability(auctionId),

    modifyPrice(auctionId, amount),

    prisma.house.update({
      where: { id: houseId },
      data: { balance: { increment: amount } }
    }),

    prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } }
    })
  ]).then(() => {

    return 'Oferta realizada con éxito';

  }).catch((error) => {
    
    return error;

  });

};
