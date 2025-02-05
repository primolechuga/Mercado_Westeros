// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';  // Usar LoginPage
import RegisterPage from './pages/RegisterPage'; // Página de registro
import ProductTablePage from './pages/ProductTablePage'; // Página de tabla de productos
import UserRequestsPage from './pages/UserRequestsTable';
import MerchantsPage from './pages/MerchantsPage';
import AddProductPage from './pages/AddProductPage';
import HousePage from './pages/HousePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} /> {/* Aquí usamos LoginPage */}
      <Route path="/register" element={<RegisterPage />} /> {/* Ruta de registro */}
      <Route path="/products" element={<ProductTablePage />} /> {/* Ruta de tabla de productos */}
      <Route path="/userRequests" element={<UserRequestsPage />} /> {/* Ruta de tabla de solicitudes de usuario */}
      <Route path="/merchants" element={<MerchantsPage />} /> {/* Ruta de tabla de solicitudes de usuario */}
      <Route path="/addProduct" element={<AddProductPage />} /> {/* Ruta de tabla de solicitudes de usuario */}
      <Route path="/housePage" element={<HousePage />} /> {/* Ruta de tabla de solicitudes de usuario */}
    </Routes>
  );
};








