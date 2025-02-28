import { Card, CardMedia, CardContent, Typography, Chip, Box } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import { AuctionItemProps } from "../item";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AuctionCard: React.FC<AuctionItemProps> = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(item.timeLeftAuction);
  const [isClicked, setIsClicked] = useState(false);

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

  return (
    <Link to={`/auctionPage/${item.id}`} style={{ textDecoration: "none" }}>
      <Card
        onMouseDown={() => setIsClicked(true)} // Reducir opacidad al hacer clic
        onMouseUp={() => setIsClicked(false)}  // Restaurar opacidad al soltar clic
        onMouseLeave={() => setIsClicked(false)} // Evitar que quede en estado de clic
        sx={{
          maxWidth: 200,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, filter 0.2s ease-in-out, opacity 0.1s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
            filter: "brightness(90%)" // Oscurecer un poco en hover
          },
          opacity: isClicked ? 0.7 : 1, // Reducir opacidad al hacer clic
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height: 180, objectFit: "contain", background: "#f8f8f8" }}
          image={item.image}
          alt={item.title}
        />

        <CardContent sx={{ textAlign: "center", padding: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, height: 40, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {item.title}
          </Typography>

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
    </Link>
  );
};

export default AuctionCard;
