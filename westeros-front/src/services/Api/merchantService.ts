// src/services/merchantService.ts
export const getMerchantsByHouse = async (houseId: number) => {
  try {
    const response = await fetch(`http://localhost:4000/merchants/${houseId}`);
    const data = await response.json();

    if (!Array.isArray(data.data)) {
      throw new Error('Respuesta inesperada de la API');
    }

    return data.data.map(({ ...rest }: { houseId: number; name: string; location: string; }) => rest);
  } catch (error) {
    console.error('Error al obtener mercaderes:', error);
    throw error;
  }
};

export const removeMerchant = async (merchantId: number) => {
  try {
    const response = await fetch(`http://localhost:4000/merchants/${merchantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Respuesta completa de la API:', response);

    return response; // Retorna el objeto Response, no JSON directamente
  } catch (error) {
    console.error('Error al eliminar mercader:', error);
    throw error;
  }
};


  


