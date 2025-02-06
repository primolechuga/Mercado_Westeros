import React from 'react';
import DataTable from '../components/dataTable';

const productData = [
  { id: 1, name: 'Producto A', price: 100, stock: 20 },
  { id: 2, name: 'Producto B', price: 200, stock: 15 },
  { id: 3, name: 'Producto A', price: 100, stock: 20 },
  { id: 4, name: 'Producto B', price: 200, stock: 15 },
  { id: 1, name: 'Producto A', price: 100, stock: 20 },
  { id: 2, name: 'Producto B', price: 200, stock: 15 },
  { id: 3, name: 'Producto A', price: 100, stock: 20 },
  { id: 4, name: 'Producto B', price: 200, stock: 15 },
];

const productColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre' },
  { id: 'price', label: 'Precio' },
  { id: 'stock', label: 'Stock' },
];

const ProductTablePage: React.FC = () => {
  return (
    <div style={{ marginTop: '20px', padding: '20px' }}>
      <h1>Tabla de productos</h1>
      <DataTable data={productData} columns={productColumns} />
    </div>
)};

export default ProductTablePage;
