export interface Auction {
    id: number;
    houseId: number;
    productId: number;
    basePrice: number;
    quantity: number;
    increment: number;
    price: number;
    initialPrice: number;
    probability: number;
    winnerId: string | null;
    ownerId: string;
    endDate: Date;
    isActive: boolean;
  }