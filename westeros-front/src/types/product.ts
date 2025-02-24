// {
//     "name": "Espada de acero valyrio",
//     "price": 1000,
//     "stock": 10,
//     "houseId": 1
//   }

export interface Product {
    name: string;
    description: string;
    basePrice: number;
    stock: number;
    houseId: number;
    image: File | null;
};