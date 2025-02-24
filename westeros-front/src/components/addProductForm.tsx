import React, { useState } from "react";
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, SelectChangeEvent } from "@mui/material";
import { createProduct } from "../services/Api/productService";
import { Product } from "../types/product";
import { useAuth } from '../contexts/authContext';

const CreateProductForm: React.FC = () => {
  const [product , setProduct] = useState({
    name: "",
    description: "",
    basePrice: "",
    houseId: 0,
    stock: "",
    image: null as File | null,
  });

  const { user } = useAuth();

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

   
    if (user) {
      product.houseId = user.houseId;
    } else {
      // Handle the case where user is null
      console.error("User is not authenticated");
      return;
    }
    const basePrice = parseFloat(product.basePrice);
    const stock = parseInt(product.stock);

    try{
    const response = createProduct("products", { ...product, basePrice, stock });

    //verificamos si la respuesta es correcta
    if (response){
      console.log(response);
      alert("Producto creado con éxito");

      setProduct({
        name: "",
        description: "",
        basePrice: "",
        houseId: 0,
        stock: "",
        image: null,
      });
    }

    else {
      console.error("Error al crear el producto");
    }



    } catch (error) {
      console.error("Error creating product", error);


    // Aquí puedes enviar los datos a la API o realizar otra acción
    };
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
