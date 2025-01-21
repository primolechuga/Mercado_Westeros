// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';
import AppRoutes from './Routes'; // Importar las rutas
import Footer from './components/footer'; // Importar el componente Footer

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <AppRoutes />  {/* Aquí renderizamos las rutas */}
      </Container>
      <Footer /> {/* Aquí renderizamos el footer */}
    </Router>
    
  );
};

export default App;





