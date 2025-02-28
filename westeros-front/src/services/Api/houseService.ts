import axios from 'axios';

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
