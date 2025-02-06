// src/App.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import {AppRoutes} from './Routes'; // Importar las rutas
import Footer from './components/footer'; // Importar el componente Footer
import PrimarySearchAppBar from './components/appBar/appBar';
import LinkTab from './components/appBar/tabBar';


export const App: React.FC = () => {
  return (
    <>
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ocupar toda la pantalla
      }}
    >
      {/* Encabezado fijo */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <PrimarySearchAppBar />
        <Box sx={{ position: "absolute", top: "64px", width: "100%" }}>
          <LinkTab />
        </Box>
      </Box>

      {/* Contenido principal que crece para empujar el footer hacia abajo */}
      <Box sx={{ flex: 1, mt: 14, width: "100%" }}>
        <AppRoutes />
      </Box>

      {/* Pie de página */}
    </Container>
    <Footer />
    </>
  );
};



