import React, { useEffect, useState } from 'react';
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GavelIcon from '@mui/icons-material/Gavel';
import FloatingChat from '../components/floatchat';
import { AuctionList } from '../components/itemList';
import { useAuth } from '../contexts/authContext';
import { getMyAuctions } from '../services/Api/auctionService';

export const MyAuctionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (user?.id) {
        try {
          const data = await getMyAuctions(user.id);
          setAuctions(data);
        } catch (error) {
          console.error('Error fetching auctions:', error);
        }
      }
    };
    fetchAuctions();
  }, [user]);

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2, 
            marginBottom: 2, 
            maxWidth: '950px',
          }}
        >
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/productList')} 
            startIcon={<GavelIcon />} 
            sx={{ 
              fontWeight: 'bold', 
              textTransform: 'none', 
              borderRadius: '8px', 
              paddingX: '16px', 
              paddingY: '10px',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#5a189a' }
            }}
          >
            Crear Subasta Nueva
          </Button>
        </Box>
        <AuctionList items={auctions} showInactiveFilter={true} />
      </Container>
      <FloatingChat />
    </Box>
  );
};