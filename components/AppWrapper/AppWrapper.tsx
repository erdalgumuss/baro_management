'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { role, isAuthenticated, isActive, setAuth } = useAuthStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage'dan verileri al
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
    const storedAccessToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    const storedRole = localStorage.getItem('role') // Role bilgisi alınmalı
    const storedIsActive = localStorage.getItem('isActive')

    if (storedIsAuthenticated === 'true' && storedAccessToken && storedRefreshToken) {
      // Eğer tokenlar varsa, isAuthenticated, role ve diğer bilgileri store'a aktar
      setAuth({
        isAuthenticated: true,
        role: storedRole || null,  // Eğer role yoksa null döndürülür
        isActive: storedIsActive === 'true',
        tokens: {
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        },
      })
    }
  }, [setAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Kullanıcı oturumu doğrulanmadı.')
      router.replace('/')
      return
    }

    if (role) {
      if (!isActive) {
        router.replace('/complete-registration')
      } else {
        switch (role) {
          case 'lawyer':
            router.replace('/lawyer')
            break
          case 'baro_officer':
            router.replace('/bar')
            break
          case 'admin':
            router.replace('/bar')
            break
          default:
            console.warn('Bilinmeyen rol:', role)
            break
        }
      }
    }
  }, [isAuthenticated, role, isActive, router])

  return <>{children}</>
}

export default AppWrapper
