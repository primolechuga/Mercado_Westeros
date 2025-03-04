import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import { getUserById } from '../services/Api/userService';
import { getHouseById } from '../services/Api/houseService';
import { useAuth } from '../contexts/authContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  balance?: number;  // Solo si es Mercader
  houseId: number;   // Asumimos que existe esta propiedad
}

interface House {
  id: number;
  name: string;
  imagePath: string;
  balance: number;
}

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) throw new Error("No hay usuario autenticado.");
        const userData: User = await getUserById(user.id);
        setUserInfo(userData);
        const houseData: House = await getHouseById(user.houseId);
        setHouse(houseData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userInfo || !house) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">No se pudo cargar la información.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Perfil
      </Typography>
      <Card elevation={4}>
        <Grid container spacing={0}>
          {/* Imagen de la casa: se muestra en la parte superior en dispositivos pequeños y a la izquierda en escritorio */}
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={house.imagePath}
              alt={house.name}
              sx={{
                width: '100%',
                height: { xs: 200, md: '100%' },
                objectFit: 'cover',
              }}
            />
          </Grid>
          {/* Información del usuario y de la casa */}
          <Grid item xs={12} md={8}>
            <CardContent>
              {/* Información del usuario */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Usuario</Typography>
                </Box>
                <Typography variant="body1">
                  <strong>Nombre:</strong> {userInfo.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {userInfo.email}
                </Typography>
                {userInfo.role === 'MERCADER' ? (
                  <Typography variant="body1">
                    <AccountBalanceWalletIcon color="action" sx={{ mr: 0.5 }} />
                    <strong>Balance:</strong> ${userInfo.balance}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    <strong>Rol:</strong> {userInfo.role}
                  </Typography>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              {/* Información de la casa */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HomeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Casa</Typography>
                </Box>
                <Typography variant="body1">
                  <strong>Nombre:</strong> {house.name}
                </Typography>
                <Typography variant="body1">
                  <AccountBalanceWalletIcon color="action" sx={{ mr: 0.5 }} />
                  <strong>Balance:</strong> ${house.balance}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

