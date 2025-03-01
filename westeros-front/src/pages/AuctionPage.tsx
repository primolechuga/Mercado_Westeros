import React, { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import AuctionCard from "../components/auctionCard";
import { getAuction, getActiveAuctions } from "../services/Api/auctionService";
import { useParams } from "react-router-dom";
import { AuctionItemType } from '../components/item'; // Asegúrate de que la ruta sea correcta
import HorizontalScroll from '../components/HomeItemList/HomeItemList';
import FloatingChat from '../components/floatchat';
import { transformAuction, AuctionSection, AuctionSectionProps } from './HomePage';

interface AuctionFromBackend {
  id: number;
  houseId: number;
  productId: number;
  basePrice: number;
  quantity: number;
  increment: number;
  price: number;
  initialPrice: number;
  probability: number;
  winnerId: string | null;
  ownerId: string;
  endDate: string;
  isActive: boolean;
  product: {
    name: string;
    description: string;
    imagePath: string;
    id: number;
  };
}

const AuctionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ahora el id viene de la URL
  const [auction, setAuction] = useState<AuctionFromBackend | null>(null);
  const [auctionsPrice, setAuctionsPrice] = useState<AuctionItemType[]>([]);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        // Usa el id de la URL para obtener la subasta actual
        const data: AuctionFromBackend = await getAuction(Number(id));
        const dataPrice: AuctionFromBackend[] = await getActiveAuctions("price");
        setAuctionsPrice(dataPrice.map(transformAuction));
        setAuction(data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };
    fetchAuction();
  }, [id]); // Se ejecuta cada vez que cambia el id

  const handleBid = (bidValue: number) => {
    console.log("Nueva puja recibida:", bidValue);
    // Aquí podrías llamar a una función de servicio para enviar la puja
  };

  if (!auction) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <AuctionCard
          prod_name={auction.product.name}
          imageUrl={auction.product.imagePath}
          description={auction.product.description}
          basePrice={auction.basePrice}
          price={auction.price}
          house={`Casa ${auction.houseId}`}
          endDate={auction.endDate}
          onBid={handleBid}
        />
      </Box>
      <section>
        <Box sx={{ paddingTop: '10px' }}>
          <AuctionSection title="Precios mas bajos" items={auctionsPrice} />
        </Box>
        <FloatingChat />
      </section>
    </Container>
  );
};

export default AuctionPage;
