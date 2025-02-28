import React, { useEffect, useState } from 'react';
import DataTable from '../components/dataTable';
import { getProductsByHouse } from '../services/Api/productService';
import { useAuth } from '../contexts/authContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const productColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nombre' },
  { id: 'price', label: 'Precio' },
  { id: 'stock', label: 'Stock' },
  { id: 'actions', label: 'Acciones' }, // Columna para los botones
];

interface DataProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  actions?: JSX.Element; // Propiedad para los botones
}

export const ProductTablePage: React.FC = () => {
  const { user } = useAuth();
  const [productData, setProductData] = useState<DataProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    price: 0,
    stock: 0
  });

  // Función para abrir el modal con los valores actuales
  const handleOpenModal = (product: DataProps) => {
    setSelectedProductId(product.id);
    setFormValues({
      price: product.price,
      stock: product.stock
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProductId(null);
    setFormValues({ price: 0, stock: 0 });
  };

  // Función para actualizar el producto
  const handleUpdate = async () => {
    if (selectedProductId === null || !user) return;

    console.log('Sending update with:', {
      houseId: user.houseId,
      productId: selectedProductId,
      payload: {
        stock: formValues.stock,
        price: formValues.price
      }
    });

    try {
      const response = await fetch(`http://localhost:4000/product/${user.houseId}/${selectedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: formValues.stock,
          price: formValues.price
        }),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        console.error('Error response:', responseData);
        throw new Error(`Error ${response.status}: ${JSON.stringify(responseData)}`);
      }

      // Actualiza el estado local
      setProductData((prevData) =>
        prevData.map((product) =>
          product.id === selectedProductId 
            ? { ...product, price: formValues.price, stock: formValues.stock } 
            : product
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error('Error detallado:', error);
    }
  };

  // Modificar el useEffect para el botón único
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getProductsByHouse(user.houseId, 0, 10);
          const formattedData = data.products.map((item: any) => ({
            id: Number(item.product.id),
            name: item.product.name,
            price: item.price,
            stock: item.stock,
            actions: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => handleOpenModal({
                    id: Number(item.product.id),
                    name: item.product.name,
                    price: item.price,
                    stock: item.stock
                  })}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Actualizar
                </button>
              </div>
            ),
          }));
          setProductData(formattedData);
        } catch (error) {
          console.error('Error fetching product data', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div style={{ marginTop: '20px', padding: '20px' }}>
      <h1>Tabla de productos</h1>
      <DataTable data={productData} columns={productColumns} />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '5px',
          }}
        >
          <h2>Actualizar Producto</h2>
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={formValues.price}
            onChange={(e) => setFormValues({...formValues, price: Number(e.target.value)})}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            type="number"
            fullWidth
            value={formValues.stock}
            onChange={(e) => setFormValues({...formValues, stock: Number(e.target.value)})}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mr: 2 }}
          >
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};