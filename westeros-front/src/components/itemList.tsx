import { Box, TextField, MenuItem, Pagination } from "@mui/material";
import React from 'react';
import { AuctionItemType, AuctionItem } from './item';
import { useState } from "react";

export const AuctionList: React.FC<{ items: AuctionItemType[] }> = ({ items }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof AuctionItemType>("title");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // New state for sort direction
  const itemsPerPage = 5;

  const filteredItems = items
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === undefined || bValue === undefined) {
        return 0; // Handle cases where property might be missing
      }

      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison; // Apply sort direction
    });

  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value as keyof AuctionItemType);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };


  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}> {/* Container for sort options */}
        <TextField
          select
          label="Ordenar por"
          value={sortBy}
          onChange={handleSortChange}
          sx={{ width: '50%', marginRight: 1 }} // Adjust width as needed
        >
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="lastBid">Última Puja</MenuItem>
          <MenuItem value="timeLeftAuction">Tiempo Restante</MenuItem>
        </TextField>
        <MenuItem onClick={handleSortDirectionChange} sx={{ width: '50%', textAlign: 'center', cursor: 'pointer'}}>
          {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
        </MenuItem>
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