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
import { ProtectedRoute } from './components/auth/protectedRoute';
import { Unauthorized } from './pages/Unauthorized';
import HousePage from './pages/HousePage';
import AuctionPage from './pages/AuctionPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/auctionPage" element={<AuctionPage />} />
      

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute allowedRoles={['mercader', 'maestre']} />}>
        <Route path="/products" element={<ProductTablePage />} />
      </Route>

      {/* Rutas protegidas solo para Maestre*/}

      <Route element={<ProtectedRoute allowedRoles={['maestre']} />}>
        <Route path="/userRequests" element={<UserRequestsPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
      </Route>

      {/* Ruta protegida solo para Mercader */}
    </Routes>
  );
};








