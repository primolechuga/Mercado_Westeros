import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles 
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    // Redirige a login si no está autenticado
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirige a una página de acceso denegado si no tiene el rol correcto
    return <Navigate to="/unauthorized" replace />;
  }

  // Renderiza las rutas protegidas
  return <Outlet />;
};