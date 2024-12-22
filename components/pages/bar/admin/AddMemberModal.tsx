'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from '@/components/ui/dialog'
//import { registerUser } from '@/services/authService' // registerUser servisi
import { Member } from '@/store/useMemberStore'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  memberType: 'lawyer' | 'baro_officer' | null
  onMemberAdded: (newMember: Member) => void
}

export default function AddMemberModal({ isOpen, onClose, memberType, onMemberAdded }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    tcNumber: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
  })
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validasyon
    if (!/^\d{11}$/.test(formData.tcNumber)) {
      alert('Geçerli bir TC Kimlik Numarası giriniz.')
      return
    }

    if (!formData.name.trim() || !formData.surname.trim()) {
      alert('Ad ve soyad alanları boş bırakılamaz.')
      return
    }

    setIsLoading(true)

    try {
      // Backend'e gönderilecek veri
      const dataToSend = {
        role: memberType,
        tcNumber: formData.tcNumber,
        name: formData.name,
        surname: formData.surname,
      }

      // Backend'den referans numarasını al
      const response = await registerUser(dataToSend)
      setReferenceNumber(response.data.referenceNumber)

      const newMember: Member = {
        id: response.data.id,
        tcNumber: formData.tcNumber,
        name: formData.name,
        surname: formData.surname,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        role: memberType!,
        referenceNumber: response.data.referenceNumber,
        isActive: false,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      }

      onMemberAdded(newMember)
      setFormData({ tcNumber: '', name: '', surname: '', email: '', phone: '' })
    } catch (error: unknown) {
      console.error('Üye ekleme hatası:', error)
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Üye eklenirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{memberType === 'lawyer' ? 'Avukat Ekle' : 'Baro Üyesi Ekle'}</DialogTitle>
          <DialogDescription>Lütfen yeni üye bilgilerini girin.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="tcNumber">TC Kimlik Numarası</Label>
            <Input
              id="tcNumber"
              name="tcNumber"
              value={formData.tcNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Ad</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="surname">Soyad</Label>
            <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">E-posta (Opsiyonel)</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Ekleniyor...' : 'Üye Ekle'}
          </Button>
        </form>
        {referenceNumber && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="text-green-800 font-semibold">Üye başarıyla eklendi!</p>
            <p className="text-green-700">Referans Numarası: {referenceNumber}</p>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>{referenceNumber ? 'Kapat' : 'İptal'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
