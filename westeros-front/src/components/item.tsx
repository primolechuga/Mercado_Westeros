import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GavelIcon from '@mui/icons-material/Gavel';

export interface AuctionItem {
    id: string;
    image: string;
    title: string;
    description: string;
    lastBid: number;
    timeLeftAuction: number; // En segundos
  }

interface AuctionItemProps {
  item: {
    id: string;
    image: string;
    title: string;
    description: string;
    lastBid: number;
    timeLeftAuction: number; // En segundos
  };
}

const AuctionItem: React.FC<AuctionItemProps> = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(item.timeLeftAuction);

  // Reducir el tiempo restante cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatear el tiempo restante
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: 2, boxShadow: 3 }}>
      {/* Imagen del artículo */}
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150 }}
        image={item.image}
        alt={item.title}
      />

      {/* Contenido del artículo */}
      <CardContent sx={{ flex: 1, padding: 2 }}>
        {/* Título */}
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.description}
        </Typography>

        {/* Información de la subasta */}
        <Stack direction="row" spacing={2} alignItems="center" marginTop={2}>
          {/* Última puja */}
          <Chip
            icon={<GavelIcon />}
            label={`Última puja: $${item.lastBid.toFixed(2)}`}
            color="primary"
            variant="outlined"
          />

          {/* Tiempo restante */}
          <Chip
            icon={<AccessTimeIcon />}
            label={`Tiempo restante: ${formatTime(timeLeft)}`}
            color={timeLeft > 0 ? 'success' : 'error'}
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AuctionItem;