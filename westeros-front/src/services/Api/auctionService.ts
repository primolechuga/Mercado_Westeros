import { api } from './api';

import { Auction } from '../../types/auction';

export const createAuction = async (auction : Auction) => {
  try {
    const response = await api.post('auction', auction);

    return response.data;
  } catch (error) {
    console.error('Error creating auction', error);
    throw error;
  }
};

export const getMyAuctions = async (userId : string) => {
  try {
    const response = await api.get(`auction/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener Subastas', error);
    throw error;
  }
};