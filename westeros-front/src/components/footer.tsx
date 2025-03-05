import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        flexShrink: 0, // Evita que el footer se expanda o se superponga al contenido
        mt: "auto", // Lo mantiene en la parte inferior
        py: 2, // Espaciado vertical
        backgroundColor: "#f8f8f8", // Fondo claro
        textAlign: "center", // Centra el contenido
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)", // Sombra suave en la parte superior
        width: "100%", // Asegura que ocupe todo el ancho
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Mercado de Westeros. Todos los derechos reservados.
      </Typography>
      <Link href="https://github.com/primolechuga/Mercado_Westeros" color="inherit" sx={{ mt: 1, display: "block" }}>
        Política de privacidad
      </Link>
    </Box>
  );
};

export default Footer;
