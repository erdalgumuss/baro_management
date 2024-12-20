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
import { useRouter } from 'next/navigation'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  referenceNumber: string
}

export default function RegisterModal({ isOpen, onClose, referenceNumber }: RegisterModalProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Burada normalde bir API çağrısı yapılır ve kullanıcı kaydedilir
    console.log('Kayıt bilgileri:', { referenceNumber, email, phone, password })
    // Simüle edilmiş başarılı kayıt
    router.push('/avukat/dashboard')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kayıt Tamamlama</DialogTitle>
          <DialogDescription>
            Lütfen kayıt işleminizi tamamlamak için aşağıdaki bilgileri doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Kaydı Tamamla</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

