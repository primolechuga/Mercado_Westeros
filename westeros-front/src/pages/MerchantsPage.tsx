import React, { useState } from 'react';
import DataTable from '../components/dataTable';
import LogoAppBar from '../components/logoAppBar';
import { Button } from '@mui/material';
import RemoveMerchant from '@mui/icons-material/PersonRemove'; // Importar el ícono

// Datos de ejemplo para los mercaderes
const merchantsData = [
  { id: 1, name: 'Mercader A', house: 'Stark', rating: 4.5 },
  { id: 2, name: 'Mercader B', house: 'Lannister', rating: 3.9 },
  { id: 3, name: 'Mercader C', house: 'Tyrell', rating: 4.2 },
  // Más datos...
];

// Definición de las columnas para la tabla
const merchantsColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre del Mercader' },
  { id: 'house', label: 'Casa' },
  { id: 'rating', label: 'Calificación' },
  { id: 'actions', label: 'Acciones' }, // Nueva columna para los botones
];

const MerchantsPage: React.FC = () => {
  // Estado para manejar los mercaderes
  const [merchants, setMerchants] = useState(merchantsData);

  // Función para eliminar un mercader
  const handleRemoveMerchant = (id: number) => {
    setMerchants(merchants.filter(merchant => merchant.id !== id));
  };

  // Agregar la columna de botones a cada mercader
  const merchantsWithActions = merchants.map(merchant => ({
    ...merchant,
    actions: (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveMerchant(merchant.id)}
        startIcon={<RemoveMerchant />} 
      >
        Sacar
      </Button>
    ),
  }));

  return (
    <div style={{ marginTop: '80px' }}>
      <LogoAppBar />
      <h1>Mercaderes</h1> {/* Título antes de la tabla */}
      <DataTable data={merchantsWithActions} columns={merchantsColumns} />
    </div>
  );
};

export default MerchantsPage;
