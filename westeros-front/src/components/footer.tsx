import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 'auto', // Para que siempre quede al final de la página
        py: 2, // Padding vertical
        backgroundColor: '#f8f8f8', // Fondo claro
        textAlign: 'center', // Centra el contenido
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Sombra suave
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Mercado de Westeros. Todos los derechos reservados.
      </Typography>
      <Link href="/privacy-policy" color="inherit" sx={{ mt: 1, display: 'block' }}>
        Política de privacidad
      </Link>
    </Box>
  );
};

export default Footer;
