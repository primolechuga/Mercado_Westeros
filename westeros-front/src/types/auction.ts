export interface Auction {
  basePrice: number;
  houseId: number;
  productId: number;
    endDate: string;
    quantity: number;
}
export interface AuctionFromBackend {
  id: number;
  basePrice: number;
  price: number;
  endDate: string;
  probability: number;
  isActive: boolean;
  winnerId: string | null;
  product: {
    name: string;
    imagePath: string;
    id: number;
    description: string;
  };
}