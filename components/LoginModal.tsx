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
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import RegisterModal from './RegisterModal'

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Normalde burada bir API çağrısı yapılır ve kullanıcının rolü alınır
    // Şimdilik basit bir simülasyon yapıyoruz
    const userRole = username === 'avukat' ? 'lawyer' : 'admin'
    
    if (userRole === 'lawyer') {
      if (referenceNumber && !password) {
        // İlk kez giriş yapan avukat
        setShowRegisterModal(true)
      } else {
        router.push('/avukat/dashboard')
      }
    } else {
      router.push('/dashboard')
    }
    
    setIsOpen(false)
  }

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
              Avukat veya Baro yetkilisi olarak giriş yapın.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="referenceNumber">Referans Numarası (Avukatlar için)</Label>
              <Input
                id="referenceNumber"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
              />
            </div>
            {!referenceNumber && (
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!referenceNumber}
                />
              </div>
            )}
            <Button type="submit" className="w-full">Giriş Yap</Button>
          </form>
        </DialogContent>
      </Dialog>
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          referenceNumber={referenceNumber}
        />
      )}
    </>
  )
}

