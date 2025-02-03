import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <Button onClick={handleAuthAction}>
      {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
    </Button>
  );
};
