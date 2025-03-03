// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';  // Usar LoginPage
import RegisterPage from './pages/RegisterPage'; // Página de registro
import{ ProductTablePage } from './pages/ProductTablePage'; // Página de tabla de productos
// import UserRequestsPage from './pages/UserRequestsTable';// DESHABILITADO
import MerchantsPage from './pages/MerchantsPage';
import AddProductPage from './pages/AddProductPage';
import { ProtectedRoute } from './components/auth/protectedRoute';
import { Unauthorized } from './pages/Unauthorized';
import HousePage from './pages/HousePage';
import AuctionPage from './pages/AuctionPage';
import { MyAuctionsPage } from './pages/MyAuctionsPage';
import { CreateAuctionPage } from './pages/createAuctionPage';
import ProductListPage from './pages/ProductListPage';
import { MyBidsPage } from './pages/MyBidsPage';
import { WonAuctionsPage } from './pages/WonAuctionsPage';


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/auctionPage/:id" element={<AuctionPage />} />
      <Route path="/house" element={<HousePage />} />

      

      {/* Rutas protegidas
      <Route element={<ProtectedRoute allowedRoles={['mercader', 'maestre']} />}>
        <Route path="/products" element={<ProductTablePage />} />
        <Route path="/house" element={<HousePage />} />
      </Route> */}

      {/* Rutas protegidas solo para Maestre*/}

      <Route element={<ProtectedRoute allowedRoles={['maestre']} />}>
        {/* <Route path="/userRequests" element={<UserRequestsPage />} /> */}
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="/products" element={<ProductTablePage />} />
        <Route path="/house" element={<HousePage />} />
      </Route>

      {/* Ruta protegida solo para Mercader */}
    <Route element={<ProtectedRoute allowedRoles={['mercader']} />}>
      <Route path="/myAuctions" element={<MyAuctionsPage />} />
      <Route path="/createAuction/:id" element={<CreateAuctionPage />} />
      <Route path="/productList" element={<ProductListPage />} />
      <Route path="/myBids" element={<MyBidsPage />} />
      <Route path="/addProduct" element={<AddProductPage />} />
      <Route path="/myWonAuctions" element={<WonAuctionsPage />} />
    </Route>

    </Routes>
  );

};








