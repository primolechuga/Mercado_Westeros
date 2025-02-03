// src/App.tsx
import React from 'react';
import { Container } from '@mui/material';
import {AppRoutes} from './Routes'; // Importar las rutas
import Footer from './components/footer'; // Importar el componente Footer


export const App: React.FC = () => {
  return (
      <Container>
        <AppRoutes />  {/* Aquí renderizamos las rutas */}
        <Footer /> {/* Aquí renderizamos el footer */}
      </Container>
  );
};



