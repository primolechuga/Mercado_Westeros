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