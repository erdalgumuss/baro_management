'use client'

import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useAuthStore } from '@/store/useAuthStore'
import { Tokens } from '@/store/useAuthStore'

interface DecodedToken {
  role: string
  exp: number
  [key: string]: unknown
}

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    console.log('AppWrapper useEffect tetiklendi.')
    try {
      console.log('Store başlangıç durumu:', useAuthStore.getState())
      const tokensFromStorage = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      }
  
      console.log('Access Token:', tokensFromStorage.accessToken)
      console.log('Refresh Token:', tokensFromStorage.refreshToken)
      console.log(localStorage.getItem('accessToken'))
        console.log(localStorage.getItem('refreshToken'))
        console.log('Çözümlemeden önce Access Token:', tokensFromStorage.accessToken)
        console.log('Çözümlemeden önce Refresh Token:', tokensFromStorage.refreshToken)

      if (tokensFromStorage.accessToken && tokensFromStorage.refreshToken) {
        const decodedToken: DecodedToken = jwt_decode(tokensFromStorage.accessToken)
        console.log('Decoded Token:', decodedToken)
  
        setAuth({
          isAuthenticated: true,
          role: decodedToken.role,
          tokens: tokensFromStorage as Tokens,
        })
  
        console.log('Role (Store üzerinden):', useAuthStore.getState().role)

      } else {
        console.warn('Token bilgileri eksik, oturum başlatılmadı.')
      }
    } catch (error) {
      console.error('useEffect hata aldı:', error)
    }
  }, [setAuth, clearAuth])
  
  return <>{children}</>
}

export default AppWrapper
