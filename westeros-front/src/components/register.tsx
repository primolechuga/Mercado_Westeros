import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  house: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    house: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      house: e.target.value,
    }));
  };

  const houseMapping: Record<string, number> = {
    Stark: 1,
    Lannister: 2,
    Baratheon: 3,
    Tyrell: 4,
    Martell: 5,
    Tully: 6,
    Targaryen: 7,
    Arryn: 8,
    Greyjoy: 9,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const houseId = houseMapping[formData.house] || 1;

    const payload = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      houseId,
    };

    const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Usuario creado exitosamente');
      navigate('/login'); // Redirige al login después del registro
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
        height: '75vh',
      }}
    >
      <Paper
        sx={{
          padding: 3,
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

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="house-label">Casa</InputLabel>
            <Select
              labelId="house-label"
              name="house"
              value={formData.house}
              onChange={handleSelectChange}
              label="Casa"
            >
              {Object.keys(houseMapping).map((house) => (
                <MenuItem key={house} value={house}>
                  {house}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
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
