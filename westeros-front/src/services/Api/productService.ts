//Funciones para consumir los servicios de productos
import { api } from './api';

import { Product } from '../../types/product';

/*
*Crea un nuevo producto
* POST /products/{type}
*/

export const createProduct = async (type : String, product : Product) => {
  try {

    const formData = new FormData();

    // Agrega el archivo de imagen al FormData
    if (product.image) {
      formData.append('image', product.image);
    }

    // Agrega el resto de campos al FormData
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('basePrice', product.basePrice.toString());
    formData.append('stock', product.stock.toString());
    formData.append('houseId', product.houseId.toString());

    const response = await api.post(`product/${type}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
};

