import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" color="error" gutterBottom>
        403 - Acceso Denegado
      </Typography>
      <Typography variant="h6" paragraph>
        No tienes permisos para acceder a esta página.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </Container>
  );
};


