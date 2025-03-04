import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import FloatingChat from '../components/floatchat';
import HorizontalScroll from '../components/HomeItemList/HomeItemList';
import { getActiveAuctions } from '../services/Api/auctionService';
import { AuctionItemType } from '../components/item'; // Asegúrate de que la ruta sea correcta
import{ AuctionFromBackend} from '../types/auction';


// Función para transformar el objeto del backend al formato que espera AuctionItem
export const transformAuction = (auction: AuctionFromBackend): AuctionItemType => {
  const endDateObj = new Date(auction.endDate);  
  const timeLeftAuction = Math.max(Math.floor((endDateObj.getTime() - Date.now()) / 1000), 0);
  return {
    id: auction.id.toString(),
    image: auction.product.imagePath,
    title: auction.product.name,
    description: auction.product.description,
    lastBid: auction.price,
    timeLeftAuction,
    endDate: endDateObj, // Puedes mantenerlo como Date o string según tus necesidades
    status: auction.isActive ? "active" : "finished"
  };
};

export const HomePage: React.FC = () => {
  const [auctionsPrice, setAuctionsPrice] = useState<AuctionItemType[]>([]);
  const [auctionsDefault, setAuctionsDefault] = useState<AuctionItemType[]>([]);
  const [auctionsDate, setAuctionsDate] = useState<AuctionItemType[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        // Llamadas a la API con distintos parámetros de orden
        const dataPrice: AuctionFromBackend[] = await getActiveAuctions("price");
        const dataDefault: AuctionFromBackend[] = await getActiveAuctions("quantity"); // Orden normal (sin parámetro)
        const dataDate: AuctionFromBackend[] = await getActiveAuctions("date");
        
        setAuctionsPrice(dataPrice.map(transformAuction));
        setAuctionsDefault(dataDefault.map(transformAuction));
        setAuctionsDate(dataDate.map(transformAuction));
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <section>
      <Box sx={{ paddingTop: '10px' }}>
        <AuctionSection title="Precios mas bajos" items={auctionsPrice} />
        <AuctionSection title="Basados en tus gustos" items={auctionsDefault} />
        <AuctionSection title="Última oportunidad para participar" items={auctionsDate} />
      </Box>
      <FloatingChat />
    </section>
  );
};

export interface AuctionSectionProps {
  title: string;
  items: AuctionItemType[];
}

export const AuctionSection: React.FC<AuctionSectionProps> = ({ title, items }) => (
  <Container sx={{ mt: 4 }}>
    <h2>{title}</h2>
    <HorizontalScroll items={items} aria-label={title} />
  </Container>
);
