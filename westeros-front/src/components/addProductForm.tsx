import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AddProductFormProps {
  onAddProduct: (product: { id: number; name: string; price: number; stock: number }) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newProduct = {
      id: Date.now(), // Generar un ID único (se puede cambiar según sea necesario)
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    onAddProduct(newProduct);

    // Reiniciar los campos
    setName('');
    setPrice('');
    setStock('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Agregar Producto
      </Typography>
      <TextField
        label="Nombre del Producto"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Precio"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <TextField
        label="Stock"
        variant="outlined"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Agregar Producto
      </Button>
    </Box>
  );
};

export default AddProductForm;
