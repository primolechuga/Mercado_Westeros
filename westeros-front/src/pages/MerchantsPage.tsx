import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../components/dataTable';
import LogoAppBar from '../components/logoAppBar';
import { Button, CircularProgress } from '@mui/material';
import RemoveMerchant from '@mui/icons-material/PersonRemove';

interface Merchant {
  id: string;
  name: string;
  email: string;
  balance: number;
}

const merchantsColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre del Mercader' },
  { id: 'email', label: 'Correo' },
  { id: 'balance', label: 'Saldo' },
  { id: 'role', label: 'Rol' }, // Antes era `house`
  { id: 'actions', label: 'Acciones' },
];

const MerchantsPage: React.FC = () => {
  const { houseId } = useParams();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userHouseId = user.houseId;
    
    console.log('House ID obtenido:', userHouseId);
    
    if (!userHouseId) {
      setError('No se encontró una casa asociada al usuario.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:4000/merchants/${userHouseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Datos obtenidos:', data);
        if (!Array.isArray(data.data)) {
          throw new Error('Respuesta inesperada de la API');
        }
        // Filtrar la clave "houseId" para que no se muestre en la tabla
        const filteredMerchants = data.data.map(({ houseId, ...rest }: { houseId: number; [key: string]: any }) => rest);
        setMerchants(filteredMerchants);
      })
      .catch((error) => {
        console.error('Error al obtener mercaderes:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveMerchant = async (merchantId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/merchants/${merchantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar el mercader');

      setMerchants((prevMerchants) => prevMerchants.filter(merchant => merchant.id !== merchantId));
    } catch (err: any) {
      setError(err.message);
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
      <LogoAppBar />
      <h1>Mercaderes de la Casa {houseId}</h1>

      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <DataTable data={merchantsWithActions} columns={merchantsColumns} />
      )}
    </div>
  );
};

export default MerchantsPage;
