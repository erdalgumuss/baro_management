import { useState } from "react";
import jwt_decode from "jwt-decode";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface DecodedToken {
  role: string;
  isActive: boolean;
  exp: number;
  [key: string]: unknown;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleLogin = async (tcNumber: string, password: string) => {
    setLoading(true);
    setError(null);
  
    try {
      const { data } = await login(tcNumber, password);
      const { accessToken, refreshToken } = data;
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      if (!accessToken || !refreshToken) {
        console.log("Tokenlar bulunamadı, kullanıcı oturumu doğrulanamadı.");
        router.replace("/");
        return;
      }
      console.log("accessToken hookta", accessToken);
      console.log("refreshToken hookta", refreshToken);
  
      const decodedToken: DecodedToken = jwt_decode(accessToken);
  
      setAuth({
        isAuthenticated: true,
        role: decodedToken.role,
        tokens: { accessToken, refreshToken },
        isActive: decodedToken.isActive,
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem("isActive", decodedToken.isActive.toString());
  
      if (!decodedToken.isActive) {
        return { needsRegistration: true, role: decodedToken.role };
      }
  
      return { needsRegistration: false, role: decodedToken.role };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Giriş sırasında hata:", err.message);
        setError("Giriş başarısız. Bilgilerinizi kontrol edin.");
      } else {
        console.error("Bilinmeyen bir hata oluştu:", err);
        setError("Beklenmeyen bir hata oluştu.");
      }
      return { needsRegistration: false, role: null };
    } finally {
      setLoading(false);
    }
  };
  

  return { handleLogin, loading, error };
};

export default useAuth;
