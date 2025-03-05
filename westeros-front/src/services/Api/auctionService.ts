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
//const { orderBy } = req.query; // Recibe el parámetro de orden

export const getActiveAuctions = async (orderBy : string) => {
  try {
    const response = await api.get('auction', { params: { orderBy } });
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions', error);
    throw error;
  }
};

export const getAuction = async (auctionId : number) => {
  try {
    const response = await api.get(`auction/info/${auctionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching auction', error);
    throw error;
  }
};

export const searchAuctions = async (query : string) => {
  try {
    const response = await api.get('auction/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions', error);
    throw error;
  }
};
