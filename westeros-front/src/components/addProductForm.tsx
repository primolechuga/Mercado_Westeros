import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { createProduct } from "../services/Api/productService";
import { useAuth } from "../contexts/authContext";
import { SelectChangeEvent } from "@mui/material";

const CreateProductForm: React.FC = () => {
  const [product, setProduct] = useState({
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

  // Manejar cambios en el Select de "Casa que lo oferta" (si lo llegas a usar)
  const handleSelectChange = (event: SelectChangeEvent) => {
    setProduct((prev) => ({
      ...prev,
      house: event.target.value,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      product.houseId = user.houseId;
    } else {
      console.error("User is not authenticated");
      return;
    }
    const basePrice = parseFloat(product.basePrice);
    const stock = parseInt(product.stock);

    try {
      const response = await createProduct("products", { ...product, basePrice, stock });
      if (response) {
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
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, boxShadow: 3 }}>
        <CardHeader title="Crear Nuevo Producto" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Descripción"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              label="Precio Base"
              name="basePrice"
              type="number"
              value={product.basePrice}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Stock Disponible"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button variant="contained" component="label">
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {product.image && (
              <Typography variant="body2">
                Imagen seleccionada: {product.image.name}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary">
              Crear Producto
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateProductForm;
