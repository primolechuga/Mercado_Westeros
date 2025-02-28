import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, TextField, Button, Box } from "@mui/material";

interface AuctionCardProps {
  imageUrl: string;
  prod_name: string;
  description: string;
  basePrice: number;
  price: number;
  house: string;
  onBid: (bidValue: number) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ imageUrl, prod_name, description, basePrice, price, house, onBid }) => {
  const [bidValue, setBidValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidValue(event.target.value);
  };

  const handleBidSubmit = () => {
    const bidAmount = parseFloat(bidValue);
    if (!isNaN(bidAmount) && bidAmount > price) {
      onBid(bidAmount);
      setBidValue("");
    } else {
      alert("Ingrese una puja válida mayor a la última puja.");
    }
  };

  return (
    <Card
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      sx={{
        maxWidth: 1000,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, filter 0.2s ease-in-out, opacity 0.1s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
          filter: "brightness(90%)"
        },
        opacity: isClicked ? 0.7 : 1
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center"
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Producto en subasta"
          sx={{
            width: { xs: "100%", sm: 400 },
            height: { xs: "auto", sm: 400 },
            borderRadius: 2
          }}
        />

        <CardContent sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h5" gutterBottom>
            {prod_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {house}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography variant="body1">
            <strong>Precio Base:</strong> ${basePrice}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Última Puja:</strong> ${price}
          </Typography>
          <TextField
            label="Ingrese su puja"
            type="number"
            variant="outlined"
            fullWidth
            value={bidValue}
            onChange={handleBidChange}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleBidSubmit}>
              Pujar
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default AuctionCard;
