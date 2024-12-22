import { useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { login } from '@/services/authService';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  role: string;
  isActive: boolean;
  exp: number;
  [key: string]: unknown;
}

export const useAuth = () => {
  const { setAuth, clearAuth, refreshAccessToken } = useAuthStore();

  const handleLogin = useCallback(
    async (tcNumber: string, password: string) => {
      try {
        const { data } = await login(tcNumber, password);

        const { accessToken, refreshToken } = data;
        const decodedToken: DecodedToken = jwt_decode(accessToken);

        setAuth({
          isAuthenticated: true,
          role: decodedToken.role,
          isActive: decodedToken.isActive,
          tokens: { accessToken, refreshToken },
        });
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    [setAuth]
  );

  const handleLogout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return {
    handleLogin,
    handleLogout,
    refreshAccessToken,
  };
};
