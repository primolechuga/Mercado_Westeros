import { api } from './api';
import { Bid } from '../../types/bid';

export const createBid = async (bid: Bid) => {
  try {
    const response = await api.post('bids', bid);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        // Si el código de estado es 400, mostramos el mensaje enviado por el API
        const errorMessage = error.response.data?.message || 'Error desconocido al crear la puja';
        throw new Error(errorMessage);
      }
      // Si el backend envió un mensaje de error, lo extraemos
      const errorMessage = error.response.data?.message || 'Error desconocido al crear la puja';
      throw new Error(errorMessage);
    } else if (error.request) {
      // El request fue hecho pero no hubo respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Otro tipo de error
      throw new Error('Error al procesar la solicitud');
    }
  }
};

export const getBids = async (userId: string) => {
  try {
    const response = await api.get(`bids/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        // Si el código de estado es 400, mostramos el mensaje enviado por el API
        const errorMessage = error.response.data?.message || 'Error desconocido al obtener las pujas';
        throw new Error(errorMessage);
      }
      // Si el backend envió un mensaje de error, lo extraemos
      const errorMessage = error.response.data?.message || 'Error desconocido al obtener las pujas';
      throw new Error(errorMessage);
    } else if (error.request) {
      // El request fue hecho pero no hubo respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Otro tipo de error
      throw new Error('Error al procesar la solicitud');
    }
  }
};
