import React from 'react';
// import PrimarySearchAppBar from '../components/navBar';
import { Container, Box, } from '@mui/material';
// import { Link } from 'react-router-dom';
import FloatingChat from '../components/floatchat';
// import GavelIcon from '@mui/icons-material/Gavel'; // Icono de subasta
import imagen from '../assets/imagen.jpeg';
// import HorizontalScroll from '../components/HomeItemList/HomeItemList';
// import { ActiveBidItem} from '../components/bids/activeBids';
// import LinkTab from '../components/appBar/tabBar';
// import NavBar from '../components/buttonNav';
// import { useNavigate } from 'react-router-dom';
import { BidsList } from '../components/bids/bidsList';


export const MyBidsPage: React.FC = () => {
  // const navigate = useNavigate();
  const mockItems = [
    {
      id: '1',
      image: imagen,
      title: 'Cámara Nikon D3500',
      description: 'Cámara DSLR perfecta para principiantes.',
      currentBid: 450.99,
      myBid: 450.99,
      timeLeftAuction: 20,
      status: 'finished',
      endDate : new Date(),
    },
    {
      id: '2',
      image: imagen,
      title: 'iPhone 13 Pro Max',
      description: '128GB, excelente estado.',
      currentBid: 999.99,
      myBid: 450.99,
      timeLeftAuction: 7200,
      status: 'active',
      endDate : new Date(),
    },
  ];

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        {/* Contenedor para el botón con alineación y estilos mejorados */}
      <BidsList items={mockItems} />
      </Container>
      <FloatingChat />
    </Box>
  );
}

