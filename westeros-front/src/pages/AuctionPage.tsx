import React, { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import AuctionCard from "../components/auctionCard";
import { getAuction, getActiveAuctions } from "../services/Api/auctionService";
import { createBid } from "../services/Api/bid"; // Función para crear la puja
import { useParams } from "react-router-dom";
import { AuctionItemType } from '../components/item';
import HorizontalScroll from '../components/HomeItemList/HomeItemList';
import FloatingChat from '../components/floatchat';
import { transformAuction, AuctionSection } from './HomePage';
import { useAuth } from "../contexts/authContext";

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
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionFromBackend | null>(null);
  const [auctionsPrice, setAuctionsPrice] = useState<AuctionItemType[]>([]);
  const { user } = useAuth();

  // Función para recargar la subasta actualizada
  const fetchAuctionData = async () => {
    try {
      const data: AuctionFromBackend = await getAuction(Number(id));
      setAuction(data);
    } catch (error) {
      console.error("Error fetching updated auction:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AuctionFromBackend = await getAuction(Number(id));
        const dataPrice: AuctionFromBackend[] = await getActiveAuctions("price");
        setAuctionsPrice(dataPrice.map(transformAuction));
        setAuction(data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };
    fetchData();
  }, [id]);

  // Esta función se pasa a AuctionCard y se encarga de realizar la puja y actualizar el precio
  const handleBid = async (bidValue: number) => {
    try {
      await createBid({
        amount: bidValue,
        auctionId: auction?.id || 0,
        userId: user?.id || "",
      });
      alert("Puja realizada con éxito");
      // Vuelve a obtener la subasta actualizada para mostrar el nuevo precio
      await fetchAuctionData();
    } catch (error: any) {
      alert(error.message || "Error al realizar la puja");
    }
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
          auctionId={auction.id}
          onBid={handleBid}
          isOwnAuction={user ? user.houseId === auction.houseId : false}
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
