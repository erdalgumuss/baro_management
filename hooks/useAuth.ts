import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { fetchUserInfo } from '@/services/authService'

export function useAuth() {
  const { setUserInfo, accessToken } = useAuthStore()

  useEffect(() => {
    const getUserInfo = async () => {
      if (!accessToken) return

      try {
        const userInfo = await fetchUserInfo(accessToken)
        setUserInfo(userInfo)
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error)
      }
    }

    getUserInfo()
  }, [accessToken])

  return useAuthStore()
}
