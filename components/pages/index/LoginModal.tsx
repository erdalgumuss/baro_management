'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { login } from '@/services/authService'
import { useAuthStore } from '@/store/useAuthStore'
import CompleteUserRegistrationModal from '@/components/pages/index/CompleteUserRegistrationModal'
import jwt_decode from 'jwt-decode'

interface DecodedToken {
  role: string
  isActive: boolean
  exp: number
  [key: string]: unknown
}

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [tcNumber, setTcNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showCompleteRegistrationModal, setShowCompleteRegistrationModal] = useState(false)
  const router = useRouter()

  const setAuth = useAuthStore((state) => state.setAuth)
  const role = useAuthStore((state) => state.role) // Role bilgisi buradan alınıyor

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await login(tcNumber, password)
      console.log('Login Yanıtı:', data)

      const { accessToken, refreshToken } = data

      // Token'ları localStorage'a kaydet
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      console.log('Access Token:', localStorage.getItem('accessToken'))
      console.log('Refresh Token:', localStorage.getItem('refreshToken'))

      // Token çözümleme
      const decodedToken: DecodedToken = jwt_decode(accessToken)
      console.log('Decoded Token (LoginModal):', decodedToken)

      // Auth durumunu güncelle
      setAuth({
        isAuthenticated: true,
        role: decodedToken.role, // Token'dan gelen role
        tokens: { accessToken, refreshToken },
        isActive: decodedToken.isActive,
      })
      console.log('setAuth sonrası role (Store):', role)
      console.log('Decoded Token,2 (LoginModal):', decodedToken)

      // Kullanıcı aktif değilse kayıt tamamlama modalını aç
      if (!decodedToken.isActive) {
        setTimeout(() => setShowCompleteRegistrationModal(true), 100)
      
        // Role'e göre yönlendirme
        setTimeout(() => {
          if (decodedToken.role === 'lawyer') {
            console.log('Lawyer yönlendirmesi başlıyor...')
            router.push('/lawyer')
          } else {
            console.log('Admin yönlendirmesi başlıyor...')
            router.push('/bar')
          }
        }, 100)
      }

      setIsOpen(false)
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error)
    }
  }

  useEffect(() => {
    console.log('LoginModal - Role (Store üzerinden):', role)
  }, [role]) // Role değiştiğinde logları kontrol et

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Giriş Yap</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Giriş Yap</DialogTitle>
            <DialogDescription>
              TC Kimlik Numarası ve Şifrenizi girerek giriş yapın.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tcNumber">TC Kimlik Numarası</Label>
              <Input
                id="tcNumber"
                value={tcNumber}
                onChange={(e) => setTcNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Giriş Yap</Button>
          </form>
        </DialogContent>
      </Dialog>
      {showCompleteRegistrationModal && (
        <CompleteUserRegistrationModal
          isOpen={showCompleteRegistrationModal}
          onClose={() => setShowCompleteRegistrationModal(false)}
          tcNumber={tcNumber}
        />
      )}
    </>
  )
}
