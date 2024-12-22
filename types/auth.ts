

export interface User {
  id: string
  tcNumber: string
  name: string
  surname: string
  email?: string
  phone?: string
  password: string   
  role: 'admin' | 'baro_officer' | 'lawyer'
  accessToken:string;
  refreshToken?: string // Sürekli oturum için Refresh Token
  isActive: boolean // Hesap aktif mi?
  createdAt: Date // Oluşturulma tarihi
  updatedAt: Date // Güncellenme tarihi
}


