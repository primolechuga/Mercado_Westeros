import React from 'react';
import HouseCard from '../components/houseCard';
import { Container, Box } from '@mui/material';
import LogoAppBar from '../components/logoAppBar';

const HousePage: React.FC = () => {
  return (
    <Container>
      <LogoAppBar />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        mt={20} // Espaciado superior opcional
      >
        <HouseCard
          imageUrl="https://i0.wp.com/xn--lacompaialibredebraavos-yhc.com/wp-content/uploads/2018/09/lino-drieghe-il-winterfell-2014-linodrieghe.jpg?fit=1920%2C1279&ssl=1"
          houseName="Casa Stark"
          description="La Casa Stark de Invernalia es una casa noble del Norte. Su asentamiento es Invernalia. Durante siglos, fue la casa principal del Norte y su linaje se extiende hasta los Primeros Hombres, gobernando el Norte como reyes por derecho propio. Su emblema es un lobo huargo de cenizo corriendo sobre campo de plata. Su lema es Se acerca el Invierno. Su mandoble ancestral de acero valyrio se llamaba Hielo."
          onValueChange={(value) => console.log('Valor ingresado:', value)}
          onButton1Click={() => console.log('Botón 1 presionado')}
          onButton2Click={() => console.log('Botón 2 presionado')}
        />
      </Box>
    </Container>
  );
};

export default HousePage;

