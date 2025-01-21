import React, { useState } from 'react';
import DataTable from '../components/dataTable';
import LogoAppBar from '../components/logoAppBar';

// Datos de ejemplo para los mercaderes
const merchantsData = [
  { id: 1, name: 'Mercader A', location: 'Ciudad A', rating: 4.5 },
  { id: 2, name: 'Mercader B', location: 'Ciudad B', rating: 3.9 },
  { id: 3, name: 'Mercader C', location: 'Ciudad C', rating: 4.2 },
  // Más datos...
];

// Definición de las columnas para la tabla
const merchantsColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre del Mercader' },
  { id: 'location', label: 'Ubicación' },
  { id: 'rating', label: 'Calificación' },
];

const MerchantsPage: React.FC = () => {
  // Estado para manejar los mercaderes
  const [merchants] = useState(merchantsData);

  return (
    <div style={{ marginTop: '80px' }}>
      <LogoAppBar />
      <h1>Mercaderes</h1> {/* Título antes de la tabla */}
      <DataTable data={merchants} columns={merchantsColumns} />
    </div>
  );
};

export default MerchantsPage;
