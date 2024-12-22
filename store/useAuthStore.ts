import { create } from 'zustand'
import apiClient from '@/services/apiClient'


export interface Tokens {
  accessToken: string
  refreshToken: string
}



interface AuthState {
  isAuthenticated: boolean
  role: string | null
  isActive: boolean
  tokens: Tokens | null
  setAuth: (authData: { isAuthenticated: boolean; role: string; isActive: boolean;tokens: Tokens }) => void
  clearAuth: () => void
  refreshAccessToken: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  tokens: null,
  isActive:false,
  setAuth: ({ isAuthenticated, role, tokens, isActive }) => {
    console.log('setAuth çağrıldı:')
    console.log('isAuthenticated:', isAuthenticated)
    console.log('Role:', role)
    console.log('Tokens:', tokens)
    set({ isAuthenticated, role, tokens, isActive })
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
  },

  clearAuth: () => {
    console.log('clearAuth çağrıldı, tüm oturum bilgileri temizleniyor.')
    set({ isAuthenticated: false, role: null, tokens: null })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  refreshAccessToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      console.log('Refresh Token:', refreshToken)

      if (!refreshToken) {
        throw new Error('Yenileme tokeni bulunamadı.')
      }

      const response = await apiClient.post('/auth/refresh', { refreshToken })
      const { accessToken } = response.data
      console.log('Yenilenen Access Token:', accessToken)

      set((state) => ({
        ...state,
        tokens: { ...state.tokens!, accessToken },
      }))
      localStorage.setItem('accessToken', accessToken)
    } catch (error) {
      console.error('Token yenileme başarısız:', error)
      useAuthStore.getState().clearAuth()
    }
  },
}))



