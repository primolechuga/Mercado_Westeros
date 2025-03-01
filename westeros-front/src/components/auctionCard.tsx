import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, TextField, Button, Box, Chip } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface AuctionCardProps {
  imageUrl: string;
  prod_name: string;
  description: string;
  basePrice: number;
  price: number;
  house: string;
  onBid: (bidValue: number) => void;
  // Suponemos que item.endDate y item.timeLeftAuction vienen en el objeto AuctionItemType
  // Para este ejemplo, usaremos una propiedad "endDate" en formato string ISO
  endDate: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  imageUrl,
  prod_name,
  description,
  basePrice,
  price,
  house,
  onBid,
  endDate,
}) => {
  const [bidValue, setBidValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Función para formatear el tiempo restante en "Xh Ym Zs"
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Calcula el tiempo restante basándose en endDate ajustado a la hora local
  useEffect(() => {
    let endDateObj = new Date(endDate);
    // Ajustamos la fecha a la hora local usando los valores UTC:
    endDateObj = new Date(
      endDateObj.getUTCFullYear(),
      endDateObj.getUTCMonth(),
      endDateObj.getUTCDate(),
      endDateObj.getUTCHours(),
      endDateObj.getUTCMinutes(),
      endDateObj.getUTCSeconds()
    );
    const updateTimeLeft = () => {
      const secondsLeft = Math.max(Math.floor((endDateObj.getTime() - Date.now()) / 1000), 0);
      setTimeLeft(secondsLeft);
    };

    updateTimeLeft(); // Inicializa el tiempo restante
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

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
            height: { xs: 300, sm: 400 },
            borderRadius: 2,
            objectFit: "cover"
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
          {/* Chip con el timer */}
          <Box sx={{ mt: 1, mb: 2 }}>
            <Chip
              icon={<AccessTimeIcon />}
              label={`Tiempo restante: ${formatTime(timeLeft)}`}
              color={timeLeft > 0 ? "success" : "error"}
              variant="outlined"
            />
          </Box>
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
