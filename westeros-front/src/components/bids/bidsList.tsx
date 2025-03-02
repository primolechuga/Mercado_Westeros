import { Box, MenuItem, Pagination, FormControl, InputLabel, Select } from "@mui/material";
import React, { useState } from "react";
import { ActiveBidItem, ActiveBidType } from "./activeBids";

export const BidsList: React.FC<{ items: ActiveBidType[] }> = ({ items }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof ActiveBidType>("title");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<'all' | 'winning'>('all');
  const itemsPerPage = 5;

  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue === undefined || bValue === undefined) return 0;
    const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const filteredItems = filter === 'winning' 
    ? sortedItems.filter(item => item.myBid === item.price) 
    : sortedItems;

  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ maxWidth: 950, margin: "0 auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
      <FormControl sx={{ flex: 1 }}>
    <InputLabel id="sort-by-label">Ordenar por</InputLabel>
    <Select
      labelId="sort-by-label" // Asocia el InputLabel con el Select
      id="sort-by" // ID único para el Select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as keyof ActiveBidType)}
      label="Ordenar por" // Asegúrate de incluir el label aquí
    >
      <MenuItem value="title">Título</MenuItem>
      <MenuItem value="price">Puja Actual</MenuItem>
      <MenuItem value="timeLeftAuction">Tiempo Restante</MenuItem>
    </Select>
  </FormControl>

  {/* Filtrar */}
  <FormControl sx={{ flex: 1 }}>
    <InputLabel id="filter-label">Filtrar</InputLabel>
    <Select
      labelId="filter-label" // Asocia el InputLabel con el Select
      id="filter" // ID único para el Select
      value={filter}
      onChange={(e) => setFilter(e.target.value as 'all' | 'winning')}
      label="Filtrar" // Asegúrate de incluir el label aquí
    >
      <MenuItem value="all">Todas</MenuItem>
      <MenuItem value="winning">Voy ganando</MenuItem>
    </Select>
  </FormControl>

        <MenuItem onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')} sx={{ cursor: 'pointer' }}>
          {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
        </MenuItem>
      </Box>

      {paginatedItems.map((item) => (
        <ActiveBidItem key={item.id} item={item} />
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
