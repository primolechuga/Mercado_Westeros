import React, { useState } from 'react';
import LogoAppBar from '../components/logoAppBar';
import AddProductForm from '../components/addProductForm';

const AddProductPage: React.FC = () => {
  const [products, setProducts] = useState<
    { id: number; name: string; price: number; stock: number }[]
  >([]);

  const handleAddProduct = (product: { id: number; name: string; price: number; stock: number }) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    console.log('Producto agregado:', product);
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <LogoAppBar />
      <AddProductForm onAddProduct={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
