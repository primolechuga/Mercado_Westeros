import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Stack, useMediaQuery, Theme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from "react-router-dom";
export interface AuctionItemType {
  id: string;
  image: string;
  title: string;
  description: string;
  lastBid: number;
  timeLeftAuction: number; // En segundos
  endDate: string | Date; // Se mantiene como string para datos serializados
  status: string;
}

export interface AuctionItemProps {
  item: AuctionItemType;
}

export const AuctionItem: React.FC<AuctionItemProps> = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(item.timeLeftAuction);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (item.status !== "active") return; // Solo reducimos el tiempo si la subasta está activa

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.status]);

  // Función para formatear el tiempo restante
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Renderizamos la información según el estado de la subasta
  const renderAuctionInfo = () => {
    if (item.status === "active") {
      return (
        <Stack direction={isSmallScreen ? "column" : "row"} spacing={1} alignItems="center" marginTop={2}>
          <Chip
            icon={<GavelIcon />}
            label={`Última puja: $${item.lastBid.toFixed(2)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`Tiempo restante: ${formatTime(timeLeft)}`}
            color={timeLeft > 0 ? "success" : "error"}
            variant="outlined"
          />
        </Stack>
      );
    } else if (item.status === "finished") {
      return (
        <Stack direction={isSmallScreen ? "column" : "row"} spacing={1} alignItems="center" marginTop={2}>
          <Chip
            icon={<EventIcon />}
            label={`Finalizado: ${new Date(item.endDate).toLocaleDateString()}`}
            color="default"
            variant="outlined"
          />
          <Chip
            icon={<AttachMoneyIcon />}
            label={`Precio pagado: $${item.lastBid.toFixed(2)}`}
            color="secondary"
            variant="outlined"
          />
        </Stack>
      );
    }
    return null;
  };

  return (
    <Link to={`/auctionPage/${item.id}`} style={{ textDecoration: "none" }}>
    <Card sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", marginBottom: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: isSmallScreen ? "100%" : 150, height: isSmallScreen ? "auto" : 150, objectFit: "cover" }}
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h6" gutterBottom>{item.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{item.description}</Typography>
        {renderAuctionInfo()}
      </CardContent>
    </Card>
    </Link>
  );
};

export default AuctionItem;
