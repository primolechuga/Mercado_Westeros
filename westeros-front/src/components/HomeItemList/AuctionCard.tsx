import { Card, CardMedia, CardContent, Typography, Chip, Box } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import {AuctionItemProps} from "../item";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect } from "react";


const AuctionCard : React.FC<AuctionItemProps>  = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(item.timeLeftAuction);

   useEffect(() => {
      if (item.status !== "active") return; // Solo reducimos el tiempo si la subasta está activa
  
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(prev - 1, 0));
      }, 1000);
  
      return () => clearInterval(timer);
    }, [item.status]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };
  return (
    <Card sx={{ maxWidth: 200, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
      {/* Imagen del producto */}
      <CardMedia
        component="img"
        sx={{ width: "100%", height: 180, objectFit: "contain", background: "#f8f8f8" }}
        image={item.image}
        alt={item.title}
      />

      <CardContent sx={{ textAlign: "center", padding: 1 }}>
        {/* Nombre del producto */}
        <Typography variant="body2" sx={{ fontWeight: 500, height: 40, overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.title}
        </Typography>

        {/* Última puja */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, marginTop: 1 }}>
          <Chip
            icon={<GavelIcon />}
            label={`Última puja: $${item.lastBid.toFixed(2)}`}
            color="secondary"
            variant="outlined"
            sx={{ fontSize: 12 }}
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`${formatTime(timeLeft)}`}
            color={timeLeft > 0 ? "success" : "error"}
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuctionCard;