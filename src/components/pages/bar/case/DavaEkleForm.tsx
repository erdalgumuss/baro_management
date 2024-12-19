'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function DavaEkleForm({ onClose, onSubmit }) {
  const [yeniDava, setYeniDava] = useState({
    davaNumarasi: '',
    davaAdi: '',
    davaOzeti: '',
    basvuran: {
      adiSoyadi: '',
      email: '',
      telefon: ''
    },
    karsiTaraf: {
      adiSoyadi: '',
      avukat: ''
    },
    avukat: '',
    durum: 'aktif',
    baslangicTarihi: '',
    kategori: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setYeniDava(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNestedChange = (category, field, value) => {
    setYeniDava(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(yeniDava)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Yeni Dava Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="davaNumarasi">Dava Numarası</Label>
            <Input
              id="davaNumarasi"
              name="davaNumarasi"
              value={yeniDava.davaNumarasi}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="davaAdi">Dava Adı</Label>
            <Input
              id="davaAdi"
              name="davaAdi"
              value={yeniDava.davaAdi}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="davaOzeti">Dava Özeti</Label>
            <Textarea
              id="davaOzeti"
              name="davaOzeti"
              value={yeniDava.davaOzeti}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Başvuran Bilgileri</Label>
            <Input
              placeholder="Adı Soyadı"
              value={yeniDava.basvuran.adiSoyadi}
              onChange={(e) => handleNestedChange('basvuran', 'adiSoyadi', e.target.value)}
              className="bg-gray-700 text-gray-100 mb-2"
              required
            />
            <Input
              placeholder="E-posta"
              type="email"
              value={yeniDava.basvuran.email}
              onChange={(e) => handleNestedChange('basvuran', 'email', e.target.value)}
              className="bg-gray-700 text-gray-100 mb-2"
              required
            />
            <Input
              placeholder="Telefon"
              value={yeniDava.basvuran.telefon}
              onChange={(e) => handleNestedChange('basvuran', 'telefon', e.target.value)}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Karşı Taraf Bilgileri</Label>
            <Input
              placeholder="Adı Soyadı / Kurum Adı"
              value={yeniDava.karsiTaraf.adiSoyadi}
              onChange={(e) => handleNestedChange('karsiTaraf', 'adiSoyadi', e.target.value)}
              className="bg-gray-700 text-gray-100 mb-2"
              required
            />
            <Input
              placeholder="Avukatı"
              value={yeniDava.karsiTaraf.avukat}
              onChange={(e) => handleNestedChange('karsiTaraf', 'avukat', e.target.value)}
              className="bg-gray-700 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avukat">Atanan Avukat</Label>
            <Input
              id="avukat"
              name="avukat"
              value={yeniDava.avukat}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baslangicTarihi">Başlangıç Tarihi</Label>
            <Input
              id="baslangicTarihi"
              name="baslangicTarihi"
              type="date"
              value={yeniDava.baslangicTarihi}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kategori">Kategori</Label>
            <Select name="kategori" value={yeniDava.kategori} onValueChange={(value) => handleChange({ target: { name: 'kategori', value } })}>
              <SelectTrigger className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ceza">Ceza Davası</SelectItem>
                <SelectItem value="hukuk">Hukuk Davası</SelectItem>
                <SelectItem value="idari">İdari Dava</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
            <Button type="submit">Dava Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

