import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Theme } from "@mui/system";
import GavelIcon from "@mui/icons-material/Gavel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";

export interface ActiveBidProps {
  item: {
    id: string;
    image: string;
    title: string;
    description: string;
    currentBid: number;
    myBid: number;
    endDate: Date;
    timeLeftAuction: number;
    status: string;
  };
}

export interface ActiveBidType {
  id: string;
  image: string;
  title: string;
  description: string;
  currentBid: number;
  myBid: number;
  endDate: Date;
  timeLeftAuction: number;
  status: string;
}

export const ActiveBidItem: React.FC<ActiveBidProps> = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(item.timeLeftAuction);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    if (item.status !== "active") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.status]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const isWinning = item.myBid === item.currentBid;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        marginBottom: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: isSmallScreen ? "100%" : 150,
          height: isSmallScreen ? "auto" : 150,
          objectFit: "cover",
        }}
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.description}
        </Typography>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={1}
          alignItems="center"
          marginTop={2}
        >
          <Chip
            icon={<GavelIcon />}
            label={`Puja actual: $${item.currentBid.toFixed(2)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<GavelIcon />}
            label={`Mi puja: $${item.myBid.toFixed(2)}`}
            color={isWinning ? "success" : "error"}
            variant="outlined"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`Tiempo restante: ${formatTime(timeLeft)}`}
            color={timeLeft > 0 ? "success" : "error"}
            variant="outlined"
          />
          {isWinning && (
            <Chip
              icon={<StarIcon />}
              label="¡Vas ganando!"
              color="success"
              variant="filled"

            />
          )}
          {!isWinning && (
            <Box sx={{ 
              marginTop: 2
               }}>
              <Button
              variant="contained"
              color="secondary"

              fullWidth
              sx={{ 
                borderRadius: 5,
                padding: '4px 11px', // Padding más pequeño
                fontSize: '0.875rem',
                minWidth: 'auto',
                height: '32px',
               }}
              >
              Haz una nueva oferta
              </Button>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
