import React, { useEffect, useState } from 'react';
import HouseCard from '../components/houseCard';
import { Container, Box } from '@mui/material';
// import LogoAppBar from '../components/logoAppBar';
import { useAuth } from '../contexts/authContext';
import { getHouseById } from '../services/Api/houseService';
import { House } from '../types/house';

export const HousePage: React.FC = () => {
  const { user } = useAuth();
  const [house, setHouse] = useState<House | null>(null);

  useEffect(() => {
    const fetchHouse = async () => {
      if (user) {
        try {
          const data = await getHouseById(user.houseId);
          setHouse(data);
        } catch (error) {
          console.error('Error fetching house data', error);
        }
      }
    };

    fetchHouse();
  }, [user]);

  return (
    <Container>
      {/*<LogoAppBar />*/}
      <Box display="flex" justifyContent="center" alignItems="center" mt={20}>
        {house ? (
          <HouseCard
            imageUrl={house.imagePath}
            houseName={house.name}
            description={house.description}
            onValueChange={(value) => console.log('Valor ingresado:', value)}
            onButton1Click={() => console.log('Botón 1 presionado')}
            onButton2Click={() => console.log('Botón 2 presionado')}
          />
        ) : (
          <p>Cargando información de la casa...</p>
        )}
      </Box>
    </Container>
  );
};


