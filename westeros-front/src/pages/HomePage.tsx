import React from 'react';
import PrimarySearchAppBar from '../components/navBar';
import { Container, Box } from '@mui/material';
import FloatingChat from '../components/floatchat';
import AuctionList from '../components/itemList';

const HomePage: React.FC = () => {
  const mockItems = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      title: 'Cámara Nikon D3500',
      description: 'Cámara DSLR perfecta para principiantes.',
      lastBid: 450.99,
      timeLeftAuction: 20,
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      title: 'iPhone 13 Pro Max',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
    },
  ];

  return (
    <>
      {/* Barra de navegación */}
      <PrimarySearchAppBar />

      {/* Contenedor principal con padding ajustado */}
      <Box sx={{ paddingTop: '64px' }}> {/* 64px es la altura por defecto del AppBar */}
        <Container sx={{ mt: 4 }}>
          <AuctionList items={mockItems} />
        </Container>
        <FloatingChat />
      </Box>
    </>
  );
};

export default HomePage;

