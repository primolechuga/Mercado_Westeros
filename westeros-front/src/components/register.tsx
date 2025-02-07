import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface FormData {
  email: string;
  name: string;
  password: string;
  kingdom: string;
  address1: string;
  address2?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    kingdom: '',
    address1: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Usuario creado exitosamente');
    } else {
      alert('Error al crear el usuario');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Crear una cuenta
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
            onChange={handleTextChange}
          />
          <TextField
            label="Nombre Completo"
            name="name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleTextChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleTextChange}
          />

          {/* Campo de selección para "Reino" */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="kingdom-label">Reino</InputLabel>
            <Select
              labelId="kingdom-label"
              name="kingdom"
              value={formData.kingdom}
              onChange={handleSelectChange}
              label="Reino"
            >
              <MenuItem value="Norte">Norte</MenuItem>
              <MenuItem value="Sur">Sur</MenuItem>
              <MenuItem value="Este">Este</MenuItem>
              <MenuItem value="Oeste">Oeste</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Dirección 1"
            name="address1"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.address1}
            onChange={handleTextChange}
          />
          <TextField
            label="Dirección 2"
            name="address2"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.address2}
            onChange={handleTextChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Crear Cuenta
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" variant="body2">
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

