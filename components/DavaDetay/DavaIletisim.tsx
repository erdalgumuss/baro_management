import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DavaIletisim({ dava, onUpdate }) {
  const [yeniMesaj, setYeniMesaj] = useState('')

  const handleMesajGonder = () => {
    if (yeniMesaj.trim()) {
      const yeniMesajlar = [...dava.mesajlar, { 
        gonderen: 'Baro Yetkilisi', 
        mesaj: yeniMesaj, 
        tarih: new Date().toISOString() 
      }]
      onUpdate({ mesajlar: yeniMesajlar })
      setYeniMesaj('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">İletişim Geçmişi</h3>
        {dava.mesajlar.map((mesaj, index) => (
          <Card key={index} className="bg-gray-700 text-gray-100">
            <CardHeader>
              <CardTitle className="text-sm">{mesaj.gonderen} - {new Date(mesaj.tarih).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{mesaj.mesaj}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Yeni Mesaj</h3>
        <div className="space-y-2">
          <Label htmlFor="yeniMesaj">Mesajınız</Label>
          <Textarea
            id="yeniMesaj"
            value={yeniMesaj}
            onChange={(e) => setYeniMesaj(e.target.value)}
            className="bg-gray-700 text-gray-100"
            rows={4}
          />
        </div>
        <Button onClick={handleMesajGonder} className="bg-green-600 hover:bg-green-700 text-white">
          Mesaj Gönder
        </Button>
      </div>
    </div>
  )
}

