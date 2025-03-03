import { Auction } from '../types/auctionType';
import schedule from 'node-schedule';
import { prisma } from '../libs/prisma'; // O la ruta a tu prisma
import { closeAuction } from '../models/auction';
// import { toZonedTime } from 'date-fns-tz';


// Función que programa el cierre de una subasta
export const scheduleAuctionCloseJob = async (auction: Auction) => {
  

  const now = new Date();
  const endDate = new Date(auction.endDate);


  console.log(`Programando cierre de subasta ${auction.id} para ${endDate.toISOString()}, ahora es ${now.toISOString()}`);
  
  if (endDate <= now) {
    // Si la subasta ya expiró, se cierra inmediatamente.
    console.log(`Cerrando subasta ${auction.id} inmediatamente (ya venció).`);
    await closeAuction(auction.id);
  } else {
    //convertimos la hora a UTC
    console.log(`Programando cierre de subasta ${auction.id} para ${endDate}`);
    // Programamos el job para que se ejecute en el momento exacto de endDate.
    schedule.scheduleJob(endDate, async () => {
      try {
        await closeAuction(auction.id);
        console.log(`Subasta ${auction.id} cerrada correctamente a las ${new Date()}`);
      } catch (error) {
        console.error(`Error cerrando la subasta ${auction.id}:`, error);
      }
    });
  }
};

// Función que programa el cierre de todas las subastas activas
export const scheduleAllAuctionJobs = async () => {
  try {
    const activeAuctions = await prisma.auction.findMany({
      where: { isActive: true }
    });
    activeAuctions.forEach(auction => {
      scheduleAuctionCloseJob(auction);
    });
  } catch (error) {
    console.error('Error programando cierres de subastas:', error);
  }
};

// Llama a esta función al iniciar el servidor para programar todos los cierres pendientes.

