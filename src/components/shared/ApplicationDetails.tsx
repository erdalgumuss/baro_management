'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function ApplicationDetails({ application, onClose, onUpdate }) {
  const [formData, setFormData] = useState(application)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-50">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Başvuru Detayları</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tcKimlik" className="text-gray-700">TC Kimlik Numarası</Label>
              <Input
                id="tcKimlik"
                name="tcKimlik"
                value={formData.tcKimlik}
                onChange={handleChange}
                required
                className="bg-white text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicantName" className="text-gray-700">Başvuran Adı Soyadı</Label>
              <Input
                id="applicantName"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                className="bg-white text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Telefon Numarası</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-white text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">E-posta Adresi</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white text-gray-900"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">Adres</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventCategory" className="text-gray-700">Olay Kategorisi</Label>
            <Select name="eventCategory" value={formData.eventCategory} onValueChange={(value) => handleChange({ target: { name: 'eventCategory', value } })}>
              <SelectTrigger className="bg-white text-gray-900">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kadinCinayeti">Kadın Cinayeti</SelectItem>
                <SelectItem value="aileIciSiddet">Aile İçi Şiddet</SelectItem>
                <SelectItem value="cocukIstismari">Çocuk İstismarı</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventTitle" className="text-gray-700">Olay Başlığı</Label>
            <Input
              id="eventTitle"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              required
              className="bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDetails" className="text-gray-700">Olay Detayları</Label>
            <Textarea
              id="eventDetails"
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleChange}
              rows={4}
              required
              className="bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedLawyer" className="text-gray-700">Atanan Avukat</Label>
            <Input
              id="assignedLawyer"
              name="assignedLawyer"
              value={formData.assignedLawyer || 'Atanmadı'}
              readOnly
              className="bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents" className="text-gray-700">Dökümanlar</Label>
            <Input
              id="documents"
              name="documents"
              type="file"
              onChange={handleChange}
              multiple
              className="bg-white text-gray-900"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary text-white">Güncelle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

