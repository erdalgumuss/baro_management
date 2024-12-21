import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function VakaDurumuTakibi({ hakIhlali, onChange }) {
  const [yeniGelisme, setYeniGelisme] = useState({ tarih: '', aciklama: '' })

  const handleGelismeEkle = () => {
    if (yeniGelisme.tarih && yeniGelisme.aciklama) {
      const yeniGelismeler = [...hakIhlali.gelismeler, yeniGelisme]
      onChange('gelismeler', yeniGelismeler)
      setYeniGelisme({ tarih: '', aciklama: '' })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="durum">Vaka Durumu</Label>
        <Select
          value={hakIhlali.durum}
          onValueChange={(value) => onChange('durum', value)}
        >
          <SelectTrigger id="durum" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="islemde">İşlemde</SelectItem>
            <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
            <SelectItem value="beklemede">Beklemede</SelectItem>
            <SelectItem value="iptal">İptal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Gelişmeler</Label>
        {hakIhlali.gelismeler && hakIhlali.gelismeler.map((gelisme, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded mt-2">
            <p className="text-sm text-gray-300">{gelisme.tarih}</p>
            <p>{gelisme.aciklama}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="yeniGelismeTarih">Yeni Gelişme Ekle</Label>
        <Input
          id="yeniGelismeTarih"
          type="date"
          value={yeniGelisme.tarih}
          onChange={(e) => setYeniGelisme({...yeniGelisme, tarih: e.target.value})}
          className="bg-gray-700 text-gray-100"
        />
        <Textarea
          value={yeniGelisme.aciklama}
          onChange={(e) => setYeniGelisme({...yeniGelisme, aciklama: e.target.value})}
          placeholder="Gelişme açıklaması"
          className="bg-gray-700 text-gray-100"
        />
        <Button onClick={handleGelismeEkle}>Gelişme Ekle</Button>
      </div>
      <div>
        <Label htmlFor="sonuc">Sonuç</Label>
        <Textarea
          id="sonuc"
          value={hakIhlali.sonuc}
          onChange={(e) => onChange('sonuc', e.target.value)}
          className="bg-gray-700 text-gray-100"
          rows={3}
        />
      </div>
    </div>
  )
}

