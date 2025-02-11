import { Box, TextField, MenuItem, Pagination, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { AuctionItemType, AuctionItem } from "./item";

// Definimos las props del componente para incluir el nuevo parámetro
interface AuctionListProps {
  items: AuctionItemType[];
  showInactiveFilter?: boolean; // Parámetro opcional para mostrar u ocultar el filtro
}

export const AuctionList: React.FC<AuctionListProps> = ({ items, showInactiveFilter = false }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof AuctionItemType>("title");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showInactive, setShowInactive] = useState(false); // Estado para mostrar solo inactivos
  const itemsPerPage = 5;

  // Filtrar y ordenar los elementos
  const filteredItems = items
    .filter(item => (showInactive ? item.status !== "active" : true))
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value as keyof AuctionItemType);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          select
          label="Ordenar por"
          value={sortBy}
          onChange={handleSortChange}
          sx={{ width: "40%", marginRight: 1 }}
        >
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="lastBid">Última Puja</MenuItem>
          <MenuItem value="timeLeftAuction">Tiempo Restante</MenuItem>
        </TextField>

        <MenuItem onClick={handleSortDirectionChange} sx={{ width: "30%", textAlign: "center", cursor: "pointer" }}>
          {sortDirection === "asc" ? "Ascendente" : "Descendente"}
        </MenuItem>

        {/* Mostrar el checkbox solo si showInactiveFilter es true */}
        {showInactiveFilter && (
          <FormControlLabel
            control={
              <Checkbox
                checked={showInactive}
                onChange={() => setShowInactive(!showInactive)}
              />
            }
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