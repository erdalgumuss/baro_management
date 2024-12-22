import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 saniye zaman aşımı
})

// İstek öncesi Authorization Header ekleme
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Hata yakalama
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hata durumunu ayrıştır
    if (error.response) {
      const { status, data } = error.response
      console.error(`API Hatası: ${status} - ${data?.message || 'Bilinmeyen hata'}`)
    } else {
      console.error('Sunucuya bağlanılamadı.')
    }
    return Promise.reject(error)
  }
)

export default apiClient
