
import { AppBar, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/mwlogo.png'; // Asegúrate de que la ruta sea correcta

export default function LogoAppBar() {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              height: 50, // Ajusta el tamaño del logo
              width: 'auto', // Mantiene la proporción
              cursor: 'pointer', // Hace clickeable el logo
              margin: '10px 0', // Espaciado alrededor del logo
            }}
            onClick={() => navigate('/')} // Redirige al home al hacer clic
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
