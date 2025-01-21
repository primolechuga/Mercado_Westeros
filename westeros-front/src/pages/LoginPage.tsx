// src/pages/LoginPage.tsx
import React from 'react';
import Login from '../components/login';
import LogoAppBar from '../components/logoAppBar'; // Importar el componente LogoAppBar
const LoginPage: React.FC = () => {
  return(
  <div> 
    <Login />;
    <LogoAppBar />;
  </div>
)};

export default LoginPage;



