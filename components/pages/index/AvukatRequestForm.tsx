'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AvukatRequestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    requestDetails: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Avukat talebi gönderildi:', formData)
    // Form gönderme işlemi burada yapılacak
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      requestDetails: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="requestDetails">Talep Detayları</Label>
        <Textarea
          id="requestDetails"
          name="requestDetails"
          value={formData.requestDetails}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">Talebi Gönder</Button>
    </form>
  )
}

