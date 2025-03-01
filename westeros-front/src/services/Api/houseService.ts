import axios from 'axios';
import { House } from '../../types/house';

const API_URL = 'http://localhost:4000/house';

export const getHouseById = async (houseId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${houseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching house data:', error);
    throw error;
  }
};

export const updateMaxBid = async (houseId: number, newMaxBid: number): Promise<House> => {
  const response = await fetch(`${API_URL}/${houseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cap: newMaxBid }),
  });

  console.log('Payload enviado:', JSON.stringify({ cap: newMaxBid }));
  console.log('Status de la respuesta:', response.status);
  
  const updatedHouse = await response.json();
  console.log('Respuesta del servidor:', updatedHouse);

  return updatedHouse;
};
