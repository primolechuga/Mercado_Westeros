import React, { useEffect, useState } from 'react';
import { ProductTable } from '../components/auctions/productsTable';
import { useAuth } from '../contexts/authContext';
import { getProductsByHouse } from '../services/Api/productService';
import  FloatingChat  from '../components/floatchat';

const productColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre' },
  { id: 'price', label: 'Precio' },
  { id: 'stock', label: 'Stock' },
];
interface DataProps {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export const ProductListPage: React.FC = () => {
  const { user } = useAuth();
  const [productData, setProductData] = useState<DataProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getProductsByHouse(user.houseId, 0, 10);
          const formattedData = data.products.map((item: any) => ({
            id: Number(item.product.id),
            name: item.product.name,
            price: item.price,
            stock: item.stock,
          }));
          setProductData(formattedData);
        } catch (error) {
          console.error('Error fetching product data', error);
        }
      }
    };
    fetchData();
  }, [user]);
  return (
    <div style={{ marginTop: '20px', padding: '20px' }}>
      <h1>Tabla de productos</h1>
      <ProductTable data={productData} columns={productColumns} />
      <FloatingChat />
    </div>
)};
