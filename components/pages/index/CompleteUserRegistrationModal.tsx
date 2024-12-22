'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { completeRegistration } from '@/services/authService'


interface CompleteUserRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  tcNumber: string
}

export default function CompleteUserRegistrationModal({
  isOpen,
  onClose,
  tcNumber,
}: CompleteUserRegistrationModalProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('') // phone olarak güncellendi
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const response = await completeRegistration({
        tcNumber,
        email,
        phone,
        password,
      })
  
      console.log('Tam kayıt yanıtı:', response)
  
      // Eğer sadece mesaj dönüyorsa, kullanıcıyı yönlendirin
      if (response.message === 'Kayıt başarıyla tamamlandı.') {
        onClose() // Modal'ı kapat
      }
    } catch (error) {
      console.error('Tam kayıt sırasında bir hata oluştu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tam Kayıt İşlemi</DialogTitle>
          <DialogDescription>
            Lütfen aşağıdaki bilgileri doldurarak kayıt işlemini tamamlayın.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCompleteRegistration} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="tcNumber">TC Kimlik Numarası</Label>
            <Input
              id="tcNumber"
              type="text"
              value={tcNumber}
              readOnly
              className="bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon Numarası</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Yeni Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Kaydediliyor...' : 'Kaydı Tamamla'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
