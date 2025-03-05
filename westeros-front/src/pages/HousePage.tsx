import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  Button
} from '@mui/material';
import { getHouseById } from '../services/Api/houseService';
import { updateMaxBid } from '../services/Api/houseService';
import { useAuth } from '../contexts/authContext';
import { House } from '../types/house';

export const HousePage: React.FC = () => {
  const { user } = useAuth();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);
  const [newCap, setNewCap] = useState<number>(0);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) throw new Error("No hay usuario autenticado.");
        const houseData = await getHouseById(user.houseId);
        setHouse(houseData);
        setNewCap(houseData.cap);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    if (!house) return;
    try {
      setUpdating(true);
      await updateMaxBid(house.id, newCap);
      if (!user) throw new Error("No hay usuario autenticado.");
      const updatedHouse = await getHouseById(user.houseId ? user.houseId : 0);
      setHouse(updatedHouse);
      alert("Tope actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el tope", error);
      alert("Error al actualizar el tope");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  if (!house) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">No se pudo cargar la información de la casa.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card elevation={4} sx={{ maxWidth: 700, margin: '0 auto' }}>
        <CardMedia
          component="img"
          image={house.imagePath}
          alt={house.name}
          sx={{
            width: '100%',
            height: { xs: 200, md: 300 },
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: '#f0f0f0',
          }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {house.name}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {house.description}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            <strong>Balance de la Casa:</strong> ${house.balance}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
            <TextField
              label="Tope de puja actual"
              type="number"
              variant="outlined"
              fullWidth
              value={newCap}
              onChange={(e) => setNewCap(Number(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={updating}
              sx={{ minWidth: 150 }}
            >
              {updating ? "Actualizando..." : "Actualizar tope"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
