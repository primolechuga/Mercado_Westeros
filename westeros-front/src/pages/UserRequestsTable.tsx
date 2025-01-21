import React, { useState } from 'react';
import DataTable from '../components/dataTable';
import LogoAppBar from '../components/logoAppBar';
import { Button } from '@mui/material';

// Datos de ejemplo para las solicitudes de usuario
const userRequestsData = [
  { id: 1, username: 'Juan Pérez', email: 'juan@ejemplo.com', status: 'Pendiente' },
  { id: 2, username: 'Ana Gómez', email: 'ana@ejemplo.com', status: 'Pendiente' },
  // Más datos...
];

// Definición de las columnas para la tabla
const userRequestsColumns = [
  { id: 'id', label: 'ID' },
  { id: 'username', label: 'Nombre de Usuario' },
  { id: 'email', label: 'Correo Electrónico' },
  { id: 'status', label: 'Estado' },
  { id: 'actions', label: 'Acciones' }, // Columna para los botones de acción
];

const UserRequestsPage: React.FC = () => {
  // Estado para manejar las solicitudes de usuario
  const [requests, setRequests] = useState(userRequestsData);

  // Función para manejar la acción de aceptar una solicitud
  const handleAccept = (id: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Aceptada' } : request
      )
    );
  };

  // Función para manejar la acción de rechazar una solicitud
  const handleReject = (id: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Rechazada' } : request
      )
    );
  };

  // Adaptar las acciones para la tabla
  const adaptedRequestsData = requests.map((request) => ({
    ...request,
    actions: (
      <div>
        <Button variant="contained" color="success" onClick={() => handleAccept(request.id)}>
        Aceptar
      </Button>
      <Button variant="contained" color="error" onClick={() => handleReject(request.id)}>
        Rechazar
      </Button>
      </div>
    ),
  }));

  return (
    <div style={{ marginTop: '80px' }}>
      <LogoAppBar />
      <h1>Solicitudes de Usuario</h1>
      <DataTable data={adaptedRequestsData} columns={userRequestsColumns} />
    </div>
  );
};

export default UserRequestsPage;
