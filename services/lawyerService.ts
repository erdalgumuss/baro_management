import apiClient from './apiClient'; // API istemcinizi kullanın

export const getLawyers = async () => {
  try {
    const response = await apiClient.get('/lawyers'); // Backend endpointi
    return response.data.data; // Backend'den dönen avukat listesini alın
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    throw error;
  }
};
