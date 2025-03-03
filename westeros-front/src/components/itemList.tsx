import { Box, TextField, MenuItem, Pagination, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { AuctionItemType, AuctionItem } from "./item";

// Definimos la interfaz de los datos que vienen del backend
interface AuctionFromBackend {
  id: number;
  basePrice: number;
  endDate: string;
  probability: number;
  isActive: boolean;
  winnerId: string | null;
  product: {
    name: string;
    imagePath: string;
    id: number;
    description: string;
  };
}

// Actualizamos las props para recibir el formato del backend
interface AuctionListProps {
  items: AuctionFromBackend[];
  showInactiveFilter?: boolean;
}

export const AuctionList: React.FC<AuctionListProps> = ({ items, showInactiveFilter = false }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof AuctionItemType>("title");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showInactive, setShowInactive] = useState(false);
  const itemsPerPage = 5;

  // Transformamos los datos del backend al formato que espera AuctionItem
  const displayItems: AuctionItemType[] = items.map(auction => {
    console.log(auction.endDate);
    let endDateObj = new Date(auction.endDate);
    // endDateObj = new Date(endDateObj.getUTCFullYear(), endDateObj.getUTCMonth(), endDateObj.getUTCDate(), endDateObj.getUTCHours(), endDateObj.getUTCMinutes(), endDateObj.getUTCSeconds());
    console.log(endDateObj);
    const timeLeftAuction = Math.floor((endDateObj.getTime() - Date.now()) / 1000);
    console.log(timeLeftAuction);
    console.log(Date.now());
    return {
      id: auction.id.toString(),
      image: auction.product.imagePath,
      title: auction.product.name,
      description: auction.product.description,
      lastBid: auction.basePrice, // Utilizamos basePrice como última puja
      endDate: endDateObj,
      timeLeftAuction: timeLeftAuction > 0 ? timeLeftAuction : 0,
      status: auction.isActive ? "active" : "finished"
    };
  });

  // Filtrado y ordenamiento
  const filteredItems = displayItems
    .filter(item => (showInactive ? item.status !== "active" : true))
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          select
          label="Ordenar por"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as keyof AuctionItemType)}
          sx={{ width: "40%", marginRight: 1 }}
        >
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="lastBid">Última Puja</MenuItem>
          <MenuItem value="timeLeftAuction">Tiempo Restante</MenuItem>
        </TextField>

        <MenuItem onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")} sx={{ width: "30%", textAlign: "center", cursor: "pointer" }}>
          {sortDirection === "asc" ? "Ascendente" : "Descendente"}
        </MenuItem>

        {showInactiveFilter && (
          <FormControlLabel
            control={<Checkbox checked={showInactive} onChange={() => setShowInactive(!showInactive)} />}
            label="Solo Finalizados"
            sx={{ marginLeft: 2 }}
          />
        )}
      </Box>

      {paginatedItems.map((item) => (
        <AuctionItem key={item.id} item={item} />
      ))}

      <Pagination
        count={Math.ceil(filteredItems.length / itemsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};
