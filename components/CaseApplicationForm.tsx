'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CaseApplicationForm() {
  const [formData, setFormData] = useState({
    citizenId: '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    eventCategory: '',
    eventSummary: '',
    eventDetails: '',
    document: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevState => ({ ...prevState, document: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dava başvurusu gönderildi:', formData)
    // Form gönderme işlemi burada yapılacak
    setFormData({
      citizenId: '',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      eventCategory: '',
      eventSummary: '',
      eventDetails: '',
      document: null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="citizenId">TC Kimlik Numarası</Label>
        <Input
          type="text"
          id="citizenId"
          name="citizenId"
          value={formData.citizenId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="fullName">Ad Soyad</Label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">E-posta</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Adres</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="eventCategory">Olay Kategorisi</Label>
        <Select name="eventCategory" onValueChange={(value) => handleChange({ target: { name: 'eventCategory', value } } as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kadinCinayeti">Kadın Cinayeti</SelectItem>
            <SelectItem value="cocukIstismari">Çocuk İstismarı</SelectItem>
            <SelectItem value="aileIciSiddet">Aile İçi Şiddet</SelectItem>
            <SelectItem value="diger">Diğer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="eventSummary">Olay Başlığı</Label>
        <Input
          type="text"
          id="eventSummary"
          name="eventSummary"
          value={formData.eventSummary}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="eventDetails">Olay Detayları</Label>
        <Textarea
          id="eventDetails"
          name="eventDetails"
          value={formData.eventDetails}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="document">Döküman Yükle (PDF)</Label>
        <Input
          type="file"
          id="document"
          name="document"
          onChange={handleFileChange}
          accept=".pdf"
        />
      </div>
      <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">Başvuruyu Gönder</Button>
    </form>
  )
}

