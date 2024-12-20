import { create } from 'zustand'

interface AuthStore {
  accessToken: string | null
  userInfo: {
    name: string
    email: string
    role: 'admin' | 'baro_officer' | 'lawyer'
  } | null
  setAccessToken: (token: string) => void
  setUserInfo: (userInfo: AuthStore['userInfo']) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  userInfo: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUserInfo: (userInfo) => set({ userInfo }),
}))
