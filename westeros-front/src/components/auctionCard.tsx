import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, TextField, Button, Box } from "@mui/material";

interface AuctionCardProps {
  imageUrl: string;
  prod_name: string;
  description: string;
  basePrice: number;
  lastBid: number;
  house: string;
  onBid: (bidValue: number) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ imageUrl, prod_name, description, basePrice, lastBid, house, onBid }) => {
  const [bidValue, setBidValue] = useState("");

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidValue(event.target.value);
  };

  const handleBidSubmit = () => {
    const bidAmount = parseFloat(bidValue);
    if (!isNaN(bidAmount) && bidAmount > lastBid) {
      onBid(bidAmount);
      setBidValue("");
    } else {
      alert("Ingrese una puja válida mayor a la última puja.");
    }
  };

  return (
    <Card sx={{ maxWidth: 1000, padding: 3, borderRadius: 2, boxShadow: 3 }}>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, // Column for mobile, row for larger screens
          alignItems: "center"
        }}
      >
        {/* Imagen */}
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Producto en subasta"
          sx={{
            width: { xs: "100%", sm: 400 }, // Full width on mobile, fixed size on larger screens
            height: { xs: "auto", sm: 400 }, // Maintain aspect ratio on mobile
            borderRadius: 2
          }}
        />
        
        {/* Contenido */}
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
            <strong>Última Puja:</strong> ${lastBid}
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
