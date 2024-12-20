import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { verifyUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      verifyUser(accessToken).then((data) => {
        setUser(data.data);
      });
    }
  }, [accessToken]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
