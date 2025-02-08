import React from "react";
import AuctionCard from "../components/auctionCard";
import { Container, Box } from "@mui/material";

const AuctionPage: React.FC = () => {
  const handleBid = (value: number) => {
    console.log("Nueva puja recibida:", value);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AuctionCard
          prod_name="Garra"
          imageUrl="https://i.pinimg.com/474x/71/31/c7/7131c7ee6362f11dcff014790aef1ce5.jpg"
          description="Espada de acero valyrio legendaria, usada por grandes guerreros."
          basePrice={1000}
          lastBid={1500}
          house="Casa Stark"
          onBid={handleBid}
        />
      </Box>
    </Container>
  );
};

export default AuctionPage;
