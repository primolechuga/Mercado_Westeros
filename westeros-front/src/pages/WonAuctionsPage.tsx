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
// id: number;
// basePrice: number;
// endDate: string;
// probability: number;
// isActive: boolean;
// winnerId: string | null;
// product: {
//   name: string;
//   imagePath: string;
//   id: number;
//   description: string;
// };
// }
export const WonAuctionsPage: React.FC = () => {
  const navigate = useNavigate();
  const mockItems = [
    {
      id: 1,
      basePrice: 450.99,
      endDate: '2022-12-31T23:59:59',
      probability: 0.5,
      isActive: false,
      winnerId: '1',
      product: {
        name: 'Cámara Nikon D3500',
        imagePath: imagen,
        id: 1,
        description: 'Cámara DSLR perfecta para principiantes.',
      },

    },
  ]


  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        <AuctionList items={mockItems} />
      </Container>
      <FloatingChat />
    </Box>
  );
}

