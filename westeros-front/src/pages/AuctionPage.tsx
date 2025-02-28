import React, { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import AuctionCard from "../components/auctionCard";
import { getAuction } from "../services/Api/auctionService";
import { useParams } from "react-router-dom";

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
  const [auction, setAuction] = useState<AuctionFromBackend | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data: AuctionFromBackend = await getAuction(Number(id));
        setAuction(data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };
    fetchAuction();
  }, []);

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
          // Si cuentas con el nombre de la casa, úsalo; en su defecto, mostramos el houseId.
          house={`Casa ${auction.houseId}`}
          onBid={handleBid}
        />
      </Box>
    </Container>
    
  );
};

export default AuctionPage;
