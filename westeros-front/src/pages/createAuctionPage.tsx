import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Card, CardContent, Alert } from "@mui/material";
import { getProduct } from "../services/Api/productService";
import { createAuction } from "../services/Api/auctionService"; // Importamos el servicio
import { useAuth } from '../contexts/authContext';

interface ProductStore {
  product: {
    name: string;
  };
  price: number;
  stock: number;
}

export const CreateAuctionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<ProductStore | null>(null);
  const [basePrice, setBasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar el envío

  // Obtener los detalles del producto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      setError("Usuario no autenticado.");
      return;
    }

    if (Number(quantity) > product!.stock) {
      setError("La cantidad a subastar no puede ser mayor que el stock disponible.");
      return;
    }

    setError(""); // Limpiar errores previos
    setLoading(true); // Activar estado de carga

    try {
      await createAuction({
        productId: Number(id),
        basePrice: Number(basePrice),
        quantity: Number(quantity),
        endDate,
        houseId: user.houseId,
      });

      setSuccessMessage("Subasta creada exitosamente.");
      setTimeout(() => navigate("/myAuctions"), 2000); // Redirige después de 2s
    } catch (err) {
      setError("Error al crear la subasta. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  if (!product) return <Typography>Cargando producto...</Typography>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Crear Subasta para: {product.product.name}
          </Typography>
          <Typography variant="subtitle1">Precio actual: ${product.price}</Typography>
          <Typography variant="subtitle1">Stock disponible: {product.stock}</Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Precio Base" 
              type="number" 
              value={basePrice} 
              onChange={(e) => setBasePrice(e.target.value)} 
              margin="normal" 
              required
            />
            <TextField 
              fullWidth 
              label="Cantidad a subastar" 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              margin="normal" 
              required
              error={!!error} 
              helperText={error} 
            />
            <TextField 
              fullWidth 
              label="Fecha de Finalización" 
              type="datetime-local" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              margin="normal"
              required
              InputLabelProps={{ shrink: true }} 
            />
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                {loading ? "Creando..." : "Crear Subasta"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
