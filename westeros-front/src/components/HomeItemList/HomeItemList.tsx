import { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AuctionItemType } from '../item';
import AuctionCard from "./AuctionCard";

const HorizontalScroll = ({ items }: { items: AuctionItemType[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Cantidad de desplazamiento en píxeles
      scrollRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative", maxWidth: "100%", overflow: "hidden" }}>
      {/* Botón Izquierda */}
      <IconButton onClick={() => scroll("left")} sx={{ position: "absolute", left: 0, zIndex: 1, background: "rgba(0,0,0,0.5)", color: "white" }}>
        <ArrowBackIosIcon />
      </IconButton>

      {/* Contenedor de productos con scroll */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          padding: 2,
          "&::-webkit-scrollbar": { display: "none" }, // Oculta scrollbar en Chrome
        }}
      >
        {items.map((item) => (
          <Box key={item.id} sx={{ minWidth: 250, maxWidth: 300, flexGrow: 1, flexShrink: 0 }}>
           <AuctionCard key={item.id} item={item} />
          </Box>
        ))}
      </Box>

      {/* Botón Derecha */}
      <IconButton onClick={() => scroll("right")} sx={{ position: "absolute", right: 0, zIndex: 1, background: "rgba(0,0,0,0.5)", color: "white" }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HorizontalScroll;