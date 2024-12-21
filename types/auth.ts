

export interface User {
  id: string
  tcNumber: string
  name: string
  surname: string
  email?: string
  phone?: string
  password: string //backende gönderilemeyecek  
  role: 'admin' | 'baro_officer' | 'lawyer'
  referenceNumber?: string // İlk giriş için referans numarası
  accessToken:string;
  refreshToken?: string // Sürekli oturum için Refresh Token
  isActive: boolean // Hesap aktif mi?
  createdAt: Date // Oluşturulma tarihi
  updatedAt: Date // Güncellenme tarihi
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

export interface LoginCredentials {
  tcNumber: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  email: string
  role: 'lawyer' | 'citizen'
  name?: string
  surname?: string
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

