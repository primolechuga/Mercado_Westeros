// src/pages/RegisterPage.tsx
import React from 'react';
import Register from '../components/register'; // Importar el componente Register
import LogoAppBar from '../components/logoAppBar'; // Importar el componente LogoAppBar

const RegisterPage: React.FC = () => {
  return (
    <div>
      <LogoAppBar /> {/* Barra con solo el logo */}
      <Register /> {/* Componente de registro */}
    </div>
  );
};

export default RegisterPage;


