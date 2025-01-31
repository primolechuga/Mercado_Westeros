import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link, // Para los enlaces
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom
import { useAuth } from '../contexts/authContext';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async ( e : FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = response.headers.get('authorization') || '';
      login(data)
    } else {
      alert('Login failed');
    };
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Asegura que el contenedor ocupe toda la altura de la pantalla
        backgroundColor: '#fafafa', // Un fondo claro para todo el área
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400, // Limita el tamaño máximo de la caja
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff', // Fondo blanco para la caja
          borderRadius: 2, // Bordes redondeados
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Inicio de Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>

        {/* Enlaces debajo del formulario */}
        <Box sx={{ mt: 2 }}>
          <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
            ¿Olvidaste tu contraseña?
          </Link>
          <Link
            component={RouterLink} // Usar el componente RouterLink de react-router-dom
            to="/register" // Ruta de la página de registro
            variant="body2"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            ¿No tienes una cuenta? Crea una
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;








