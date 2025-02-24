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
  house: string;
  address1: string;
  address2?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    house: '',
    address1: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    console.log("Selected house:", value); // Verifica el valor seleccionado
    setFormData((prev) => ({
      ...prev,
      house: value,
    }));
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
        height: '75vh',
        backgroundColor: '#fafafa',
      }}
    >
      <Paper
        sx={{
          padding: 1,
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
            <InputLabel id="house-label">Casa</InputLabel>
            <Select
              labelId="house-label"
              name="houseId"
              value={formData.house}
              onChange={handleSelectChange}
              label="Casa"
            >
              <MenuItem value="Stark">Stark</MenuItem>
              <MenuItem value="Lannister">Lannister</MenuItem>
              <MenuItem value="Targaryen">Targaryen</MenuItem>
              <MenuItem value="Greyjoy">Greyjoy</MenuItem>
              <MenuItem value="Tyrell">Tyrell</MenuItem>
              <MenuItem value="Martell">Martell</MenuItem>
              <MenuItem value="Tully">Tully</MenuItem>
              <MenuItem value="Arryn">Arryn</MenuItem>
              
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

