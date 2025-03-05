import { api } from './api';
import { House } from '../../types/house';

export const getHouseById = async (houseId: number) => {
  try {
    const response = await api.get(`house/${houseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching house data:', error);
    throw error;
  }
};

export const updateMaxBid = async (houseId: number, newMaxBid: number): Promise<House> => {
  const response = await api.put(`house/${houseId}`, { cap: newMaxBid });

  const updatedHouse = response.data;

  return updatedHouse;
};

