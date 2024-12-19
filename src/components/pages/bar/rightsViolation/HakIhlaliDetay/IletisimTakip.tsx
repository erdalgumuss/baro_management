import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function IletisimTakip({ hakIhlali, onChange }) {
  const [yeniMesaj, setYeniMesaj] = useState('')

  const handleMesajGonder = () => {
    if (yeniMesaj.trim()) {
      const yeniMesajlar = [...(hakIhlali.mesajlar || []), { 
        gonderen: 'Baro Yetkilisi', 
        mesaj: yeniMesaj, 
        tarih: new Date().toISOString() 
      }]
      onChange('mesajlar', yeniMesajlar)
      setYeniMesaj('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="iletisimBilgisi">İletişim Bilgisi</Label>
        <Input
          id="iletisimBilgisi"
          value={hakIhlali.iletisimBilgisi}
          onChange={(e) => onChange('iletisimBilgisi', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <Label>Mesaj Geçmişi</Label>
        {hakIhlali.mesajlar && hakIhlali.mesajlar.map((mesaj, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded mt-2">
            <p className="text-sm text-gray-300">{mesaj.gonderen} - {new Date(mesaj.tarih).toLocaleString()}</p>
            <p>{mesaj.mesaj}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="yeniMesaj">Yeni Mesaj</Label>
        <Textarea
          id="yeniMesaj"
          value={yeniMesaj}
          onChange={(e) => setYeniMesaj(e.target.value)}
          className="bg-gray-700 text-gray-100"
          rows={3}
        />
        <Button onClick={handleMesajGonder}>Mesaj Gönder</Button>
      </div>
    </div>
  )
}

