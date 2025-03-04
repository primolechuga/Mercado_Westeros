// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protectedRoute';

import {WonAuctionsPage, MyBidsPage, ProductListPage , Unauthorized , AddProductPage,
  CreateAuctionPage, MyAuctionsPage, AuctionPage, HousePage, MerchantsPage, ProductTablePage ,
  RegisterPage, LoginPage, HomePage, ProfilePage} from './pages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/auctionPage/:id" element={<AuctionPage />} />
      <Route path="/house" element={<HousePage />} />

      

      Rutas protegidas
      <Route element={<ProtectedRoute allowedRoles={['mercader', 'maestre']} />}>
        <Route path="/myProfile" element={<ProfilePage />} />

      </Route>

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








