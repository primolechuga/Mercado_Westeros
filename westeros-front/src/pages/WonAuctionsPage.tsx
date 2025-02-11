import React from 'react';
// import PrimarySearchAppBar from '../components/navBar';
import { Container, Box, Button} from '@mui/material';
// import { Link } from 'react-router-dom';
import FloatingChat from '../components/floatchat';
import GavelIcon from '@mui/icons-material/Gavel'; // Icono de subasta
import imagen from '../assets/imagen.jpeg';
// import HorizontalScroll from '../components/HomeItemList/HomeItemList';
import { AuctionList } from '../components/itemList';
// import LinkTab from '../components/appBar/tabBar';
// import NavBar from '../components/buttonNav';
import { useNavigate } from 'react-router-dom';

export const WonAuctionsPage: React.FC = () => {
  const navigate = useNavigate();
  const mockItems = [
    {
      id: '1',
      image: imagen,
      title: 'Cámara Nikon D3500',
      description: 'Cámara DSLR perfecta para principiantes.',
      lastBid: 450.99,
      timeLeftAuction: 20,
      status: 'finished',
      endDate : new Date(),
    },
    {
      id: '2',
      image: imagen,
      title: 'iPhone 13 Pro Max',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      status: 'active',
      endDate : new Date(),
    },
  {
    id: '3',
    image: imagen,
    title: 'La mera Ratota',
    description: '128GB, excelente estado.',
    lastBid: 999.99,
    timeLeftAuction: 7200,
    status: 'active',
    endDate : new Date(),
  },
  {
    id: '4',
    image: imagen,
    title: 'El JuanBoloncho',
    description: '128GB, excelente estado.',
    lastBid: 999.99,
    timeLeftAuction: 7200,
    status: 'active',
    endDate : new Date(),

  },
  {
    id: '5',
    image: imagen,
    title: 'El JuanBoloncho',
    description: '128GB, excelente estado.',
    lastBid: 999.99,
    timeLeftAuction: 7200,
    status: 'active',
    endDate : new Date(),
  },
  ];

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        <AuctionList items={mockItems} />
      </Container>
      <FloatingChat />
    </Box>
  );
}

