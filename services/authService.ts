import apiClient from './apiClient';

export const registerUser = async (data: {
  role: 'baro_officer' | 'lawyer';
  tcNumber: string;
  name: string;
  surname: string;
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};



export const login = async (payload: { tcNumber: string; referenceNumber: string }) => {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  };
  
  export const completeRegistration = async (payload: { tcNumber: string; email: string; phone: string; password: string }) => {
    const response = await apiClient.post('/auth/complete-registration', payload);
    return response.data;
  };
  

  export const logout = async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  };
  

  export const refreshToken = async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken })
    return response.data.accessToken
  }
  
  

  export const verifyUser = async (token: string) => {
    const response = await apiClient.get('/auth/verifyUser', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  export const fetchUserInfo = async (accessToken: string) => {
    const response = await apiClient.get('/auth/verifyUser', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return response.data
  }
