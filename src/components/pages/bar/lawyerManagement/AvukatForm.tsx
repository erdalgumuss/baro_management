'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { specializations } from '@/utils/mockData'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
export default function AvukatForm({ lawyer, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: lawyer?.name || '',
    specialization: lawyer?.specialization || '',
    email: lawyer?.email || '',
    phone: lawyer?.phone || '',
    barNumber: lawyer?.barNumber || '',
    lawyerReferenceNumber: lawyer?.lawyerReferenceNumber || '',
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const newLawyerReferenceNumber = Math.random().toString(36).substr(2, 8).toUpperCase()
    const updatedFormData = {
      ...formData,
      lawyerReferenceNumber: lawyer ? formData.lawyerReferenceNumber : newLawyerReferenceNumber,
    }
    onSubmit(updatedFormData)
    if (!lawyer) {
      setAlertMessage(`Avukat referans numarası oluşturuldu: ${newLawyerReferenceNumber}`)
      setShowAlert(true)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{lawyer ? 'Avukat Düzenle' : 'Yeni Avukat Ekle'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Avukat Adı</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialization">Uzmanlık Alanı</Label>
            <Select name="specialization" value={formData.specialization} onValueChange={(value) => handleChange({ target: { name: 'specialization', value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Uzmanlık alanı seçin" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="barNumber">Baro Sicil Numarası</Label>
            <Input
              id="barNumber"
              name="barNumber"
              value={formData.barNumber}
              onChange={handleChange}
              required
            />
          </div>
          {lawyer && (
            <div className="space-y-2">
              <Label htmlFor="lawyerReferenceNumber">Avukat Referans Numarası</Label>
              <Input
                id="lawyerReferenceNumber"
                name="lawyerReferenceNumber"
                value={formData.lawyerReferenceNumber}
                readOnly
              />
            </div>
          )}
          <DialogFooter>
            <Button type="submit">{lawyer ? 'Güncelle' : 'Ekle'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Referans Numarası Oluşturuldu</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Tamam</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}

