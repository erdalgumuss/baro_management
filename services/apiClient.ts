import axios from 'axios';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Backend API base URL
  timeout: 10000, // İsteğin zaman aşımı süresi (ms)
  headers: {
    'Content-Type': 'application/json', // Varsayılan içerik tipi
  },
});

// Request interceptor: Her isteğe auth token ekleme
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Hataları işleme ve token yenileme
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access token süresi dolmuşsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // Yeni access token al
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          // Yeni tokenları sakla
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // Yeni token ile isteği tekrar gönder
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token yenileme başarısız:', refreshError);
        // Kullanıcıyı çıkış yap veya hata göster
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Kullanıcıyı login sayfasına yönlendir
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
