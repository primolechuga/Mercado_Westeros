import { api } from './api';
import { Product } from '../../types/product';

// Crear un producto
export const createProduct = async (type: string, product: Product) => {
  try {
    const formData = new FormData();

    if (product.image) {
      formData.append('image', product.image);
    }

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('basePrice', product.basePrice.toString());
    formData.append('stock', product.stock.toString());
    formData.append('houseId', product.houseId.toString());

    const response = await api.post(`product/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error creando producto', error);
    throw error;
  }
};

// Obtener productos por houseId
export const getProductsByHouse = async (houseId: number, page: number, pageSize: number) => {
  try {
    const response = await api.get(`product/${houseId}?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo productos', error);
    throw error;
  }
};

// Obtener un solo producto por ID
export const getProduct = async (productId: number) => {
  try {
    const response = await api.get(`product/info/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo producto', error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (houseId: number, productId: number, data: { stock?: number; price?: number }) => {
  try {
    const payload = {
      stock: data.stock ?? -1,
      price: data.price ?? -1,
    };

    const response = await api.put(`product/${houseId}/${productId}`, payload);

    return response.data;
  } catch (error) {
    console.error('Error actualizando producto', error);
    throw error;
  }
};


