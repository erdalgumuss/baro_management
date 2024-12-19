import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AvukatYonetimi({ dava, onUpdate }) {
  const [secilenAvukat, setSecilenAvukat] = useState(dava.avukat || '')

  const mockAvukatlar = [
    { id: 1, ad: 'Av. Mehmet Öz', uzmanlik: 'Ceza Hukuku' },
    { id: 2, ad: 'Av. Ayşe Yılmaz', uzmanlik: 'Aile Hukuku' },
    { id: 3, ad: 'Av. Ali Kaya', uzmanlik: 'İş Hukuku' },
  ]

  const handleAvukatDegistir = () => {
    onUpdate({ avukat: secilenAvukat })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="avukatSec">Avukat Seç</Label>
        <Select value={secilenAvukat} onValueChange={setSecilenAvukat}>
          <SelectTrigger id="avukatSec" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Avukat seçin" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-gray-100">
            {mockAvukatlar.map((avukat) => (
              <SelectItem key={avukat.id} value={avukat.ad}>
                {avukat.ad} - {avukat.uzmanlik}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleAvukatDegistir} className="bg-blue-600 hover:bg-blue-700 text-white">
        Avukat Ata
      </Button>

      {dava.avukat && (
        <Card className="bg-gray-700 text-gray-100">
          <CardHeader>
            <CardTitle>Mevcut Avukat Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ad Soyad: {dava.avukat}</p>
            <p>Uzmanlık: {mockAvukatlar.find(a => a.ad === dava.avukat)?.uzmanlik}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

