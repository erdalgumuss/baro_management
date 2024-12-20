import { useAuthStore } from '@/store/useAuthStore'

export function useRole() {
  const { user } = useAuthStore()
  return user?.role || null
}
