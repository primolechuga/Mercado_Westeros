import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import { AuctionList } from '../components/itemList';
import FloatingChat from '../components/floatchat';
import { useLocation } from 'react-router-dom';
import { searchAuctions } from '../services/Api/auctionService';

export const SearchAuctionsPage: React.FC = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extraemos el parámetro "query" de la URL
  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await searchAuctions(query);
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '10px' }} key={location.search}>
      <Container sx={{ mt: 2 }}>
        <AuctionList items={auctions} showInactiveFilter={true} />
      </Container>
      <FloatingChat />
    </Box>
  );
};


