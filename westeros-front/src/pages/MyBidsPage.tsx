import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import FloatingChat from '../components/floatchat';
import { BidsList } from '../components/bids/bidsList';
import { getBids } from '../services/Api/bid';
import { useAuth } from '../contexts/authContext';

// Interfaz para los datos que vienen del backend
interface BidFromBackend {
  id: number;
  auctionId: number;
  userId: string;
  amount: number;
  date: string;
  isWinner: boolean;
  Auction: {
    id: number;
    basePrice: number;
    endDate: string;
    isActive: boolean;
    houseId: number;
    price: number;
    product: {
      name: string;
      imagePath: string;
      description: string;
      id: number;
    };
  };
}

export interface ActiveBidType {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  myBid: number;
  endDate: Date;
  timeLeftAuction: number;
  status: string;
  isWinner: boolean;    // Nueva propiedad para saber si vas ganando
  auctionId: number;    // Para identificar la subasta
}

const transformBid = (bid: BidFromBackend): ActiveBidType => {
  const auction = bid.Auction;
  const endDateObj = new Date(auction.endDate);
  const timeLeftAuction = Math.max(Math.floor((endDateObj.getTime() - Date.now()) / 1000), 0);
  console.log(bid)
  return {
    id: bid.id.toString(),
    image: auction.product.imagePath,
    title: auction.product.name,
    description: auction.product.description,
    price: auction.price, // Se asume que el precio base es la puja actual
    myBid: bid.amount,            // La puja del usuario
    endDate: endDateObj,
    timeLeftAuction,
    status: auction.isActive ? "active" : "finished",
    isWinner: bid.isWinner,       // Se utiliza directamente la propiedad del backend
    auctionId: auction.id         // Se añade el id de la subasta
  };
};


export const MyBidsPage: React.FC = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState<ActiveBidType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        if (!user?.id) return;
        const data: BidFromBackend[] = await getBids(user.id);
        const transformedBids = data.map(transformBid);
        setBids(transformedBids);
      } catch (error) {
        console.error("Error fetching bids", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchBids();
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container sx={{ mt: 2 }}>
        <BidsList items={bids} />
      </Container>
      <FloatingChat />
    </Box>
  );
};
