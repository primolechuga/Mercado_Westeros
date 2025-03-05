import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import FloatingChat from '../components/floatchat';
import { AuctionList } from '../components/itemList';
import { useAuth } from '../contexts/authContext';
import { getMyWonAuctions } from '../services/Api/auctionService';


export const WonAuctionsPage: React.FC = () => {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWonAuctions = async () => {
      if (user?.id) {
        try {
          const data = await getMyWonAuctions(user.id);
            const transformedData = data.map((auction: any) => ({
            ...auction,
            basePrice: auction.price,
            }));
          setAuctions(transformedData);
        } catch (error) {
          console.error('Error fetching won auctions:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWonAuctions();
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        <AuctionList items={auctions} />
      </Container>
      <FloatingChat />
    </Box>
  );
};

