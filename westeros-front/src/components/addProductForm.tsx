import React, { useState } from "react";
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, SelectChangeEvent } from "@mui/material";

const CreateProductForm: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    basePrice: "",
    house: "",
    stock: "",
    image: null as File | null,
  });

  // Manejar cambios en inputs de texto y número
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar cambios en el Select de "Casa que lo oferta"
  const handleSelectChange = (event: SelectChangeEvent) => {
    setProduct(prev => ({
      ...prev,
      house: event.target.value
    }));
  };

  // Manejar la subida de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Producto creado:", product);
    // Aquí puedes enviar los datos a la API o realizar otra acción
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" value={product.name} onChange={handleChange} fullWidth required />
        <TextField label="Descripción" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={3} required />
        <TextField label="Precio Base" name="basePrice" type="number" value={product.basePrice} onChange={handleChange} fullWidth required />
        
        <FormControl fullWidth required>
          <InputLabel id="house-label">Casa que lo oferta</InputLabel>
          <Select<string>
            labelId="house-label"
            value={product.house}
            onChange={handleSelectChange}
            label="Casa que lo oferta"
          >
            <MenuItem value="Stark">Casa Stark</MenuItem>
            <MenuItem value="Lannister">Casa Lannister</MenuItem>
            <MenuItem value="Targaryen">Casa Targaryen</MenuItem>
            <MenuItem value="Baratheon">Casa Baratheon</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Stock Disponible" name="stock" type="number" value={product.stock} onChange={handleChange} fullWidth required />
        
        <Button variant="contained" component="label">
          Subir Imagen
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        {product.image && <Typography variant="body2">Imagen seleccionada: {product.image.name}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          Crear Producto
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProductForm;
