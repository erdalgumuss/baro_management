'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ApplicationForm({ application, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicationNumber: '',
    caseSubject: '',
    status: 'active',
    applicationDate: new Date().toISOString().split('T')[0],
    assignedLawyer: '',
    summary: '',
  })

  useEffect(() => {
    if (application) {
      setFormData({
        applicantName: application.applicantName || '',
        applicationNumber: application.applicationNumber || '',
        caseSubject: application.caseSubject || '',
        status: application.status || 'active',
        applicationDate: application.applicationDate || new Date().toISOString().split('T')[0],
        assignedLawyer: application.assignedLawyer || '',
        summary: application.summary || '',
      })
    }
  }, [application])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>{application ? 'Başvuru Düzenle' : 'Yeni Başvuru Ekle'}</DialogTitle>
          <DialogDescription>
            Lütfen başvuru bilgilerini eksiksiz doldurunuz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applicantName">Başvuran Adı</Label>
            <Input
              id="applicantName"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicationNumber">Başvuru Numarası</Label>
            <Input
              id="applicationNumber"
              name="applicationNumber"
              value={formData.applicationNumber}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caseSubject">Dava Konusu</Label>
            <Input
              id="caseSubject"
              name="caseSubject"
              value={formData.caseSubject}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select name="status" value={formData.status} onValueChange={(value) => handleChange({ target: { name: 'status', value } })}>
              <SelectTrigger className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicationDate">Başvuru Tarihi</Label>
            <Input
              id="applicationDate"
              name="applicationDate"
              type="date"
              value={formData.applicationDate}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedLawyer">Atanan Avukat</Label>
            <Input
              id="assignedLawyer"
              name="assignedLawyer"
              value={formData.assignedLawyer}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Özet</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            {application ? 'Güncelle' : 'Ekle'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

