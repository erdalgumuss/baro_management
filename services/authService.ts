import apiClient from './apiClient'

interface LoginResponse {
  message: string
  data: {
    accessToken: string
    refreshToken: string
    isActive: boolean
    role: string
  }
}
interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

/**
 * Kullanıcı giriş işlevi
 * @param tcNumber Kullanıcının TC Kimlik Numarası
 * @param password Kullanıcının şifresi
 * @returns Access Token, Refresh Token, isActive durumu ve rol bilgisi
 */
export const login = async (tcNumber: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { tcNumber, password })
    return response.data
  } catch (error) {
    const err = error as ApiError
    const errorMessage =
      err.response?.data?.message || 'Giriş sırasında bir hata oluştu.'
    throw new Error(errorMessage)
  }
}

export const completeRegistration = async (data: {
  tcNumber: string
  email: string
  phone: string
  password: string
}) => {
  try {
    const response = await apiClient.post('/auth/complete-registration', data)
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Tam kayıt sırasında bir hata oluştu.'
    throw new Error(errorMessage)
  }
}
