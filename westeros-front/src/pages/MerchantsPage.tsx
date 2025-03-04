import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../components/dataTable';
import { Button, CircularProgress } from '@mui/material';
import RemoveMerchant from '@mui/icons-material/PersonRemove';
import { getMerchantsByHouse, removeMerchant } from '../services/Api/merchantService';

interface Merchant {
  id: number;
  name: string;
  email: string;
  balance: number;
}

const merchantsColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre del Mercader' },
  { id: 'email', label: 'Correo' },
  { id: 'balance', label: 'Saldo' },
  { id: 'role', label: 'Rol' }, 
  { id: 'actions', label: 'Acciones' },
];

export const MerchantsPage: React.FC = () => {
  const { houseId } = useParams();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userHouseId = user.houseId;

    if (!userHouseId) {
      setError('No se encontró una casa asociada al usuario.');
      setLoading(false);
      return;
    }

    getMerchantsByHouse(userHouseId)
      .then(setMerchants)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveMerchant = async (merchantId: number) => {
    console.log(`Intentando eliminar mercader con ID: ${merchantId}`);
  
    try {
      const response = await removeMerchant(merchantId);
      console.log('Respuesta de la API:', response);
  
      if (!response.ok) {
        console.error('Error en la API:', response.statusText);
        setError(`Error al eliminar mercader: ${response.statusText}`);
        return;
      }
  
      // Si la respuesta es exitosa, actualizar la lista
      setMerchants(prev => prev.filter(merchant => merchant.id !== merchantId));
    } catch (error: any) {
      console.error('Error al eliminar mercader:', error);
      setError(error.message);
    }
  };
  

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
      <h1>Mercaderes de la Casa {houseId}</h1>

      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <DataTable data={merchantsWithActions} columns={merchantsColumns} />
      )}
    </div>
  );
};

