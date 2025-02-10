import React from 'react';
// import PrimarySearchAppBar from '../components/navBar';
import { Container, Box } from '@mui/material';
import FloatingChat from '../components/floatchat';
import HorizontalScroll from '../components/HomeItemList/HomeItemList';
import imagen from '../assets/imagen.jpeg';

// import LinkTab from '../components/appBar/tabBar';
// import NavBar from '../components/buttonNav';

const HomePage: React.FC = () => {
  const mockItems = [
    {
      id: '1',
      image: imagen,
      title: 'Cámara Nikon D3500',
      description: 'Cámara DSLR perfecta para principiantes.',
      lastBid: 450.99,
      timeLeftAuction: 20,
      endDate: new Date(),
      status: 'active',
    },
    {
      id: '2',
      image: imagen,
      title: 'iPhone 13 Pro Max',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      endDate: new Date(),
      status: 'active',
    },
    {
      id: '3',
      image: imagen,
      title: 'La mera Ratota',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      endDate: new Date(),
      status: 'active',
    },

    {
      id: '4',
      image: imagen,
      title: 'El JuanBoloncho',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      endDate: new Date(),
      status: 'active',
    },
    {
      id: '5',
      image: imagen,
      title: 'El JuanBoloncho',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      endDate: new Date(),
      status: 'active',
    },
    {
      id: '6',
      image: imagen,
      title: 'El JuanBoloncho',
      description: '128GB, excelente estado.',
      lastBid: 999.99,
      timeLeftAuction: 7200,
      endDate: new Date(),
      status: 'active',
    },
  ];

  return (
    <section> {/* Semantic element */}
      <Box sx={{ paddingTop: '10px' }}>
        <AuctionSection title="Últimas subastas publicadas" items={mockItems} />
        <AuctionSection title="Basados en tus gustos" items={mockItems} />
        <AuctionSection title="Última oportunidad para participar" items={mockItems} />
      </Box>
      <FloatingChat />
    </section>
  );
};

interface AuctionSectionProps {
  title: string;
  items: Array<{
    id: string;
    image: string;
    title: string;
    description: string;
    lastBid: number;
    timeLeftAuction: number;
    endDate: Date;
    status: string;
  }>;
}

const AuctionSection: React.FC<AuctionSectionProps> = ({ title, items }) => (
  <Container sx={{ mt: 4 }}>
    <h2>{title}</h2>
    <HorizontalScroll items={items} aria-label={title} /> {/* Add aria-label */}
  </Container>
);



export default HomePage;

