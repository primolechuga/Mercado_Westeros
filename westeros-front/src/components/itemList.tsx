import React from 'react';
import { Box } from '@mui/material';
import AuctionItem, { AuctionItem as AuctionItemType } from './item';

const AuctionList: React.FC<{ items: AuctionItemType[] }> = ({ items }) => {
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      {items.map((item) => (
        <AuctionItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default AuctionList;
