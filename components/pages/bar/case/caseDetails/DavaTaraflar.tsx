import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DavaTaraflar({ dava, onUpdate }) {
  const [basvuran, setBasvuran] = useState(dava.basvuran)
  const [karsiTaraf, setKarsiTaraf] = useState(dava.karsiTaraf)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ basvuran, karsiTaraf })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Başvuran Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="basvuranAdi">Adı Soyadı</Label>
            <Input
              id="basvuranAdi"
              value={basvuran.adiSoyadi}
              onChange={(e) => setBasvuran({...basvuran, adiSoyadi: e.target.value})}
              className="bg-gray-600 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="basvuranEmail">E-posta</Label>
            <Input
              id="basvuranEmail"
              value={basvuran.email}
              onChange={(e) => setBasvuran({...basvuran, email: e.target.value})}
              className="bg-gray-600 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="basvuranTelefon">Telefon</Label>
            <Input
              id="basvuranTelefon"
              value={basvuran.telefon}
              onChange={(e) => setBasvuran({...basvuran, telefon: e.target.value})}
              className="bg-gray-600 text-gray-100"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Karşı Taraf Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="karsiTarafAdi">Adı Soyadı / Kurum Adı</Label>
            <Input
              id="karsiTarafAdi"
              value={karsiTaraf.adiSoyadi}
              onChange={(e) => setKarsiTaraf({...karsiTaraf, adiSoyadi: e.target.value})}
              className="bg-gray-600 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="karsiTarafAvukat">Avukatı</Label>
            <Input
              id="karsiTarafAvukat"
              value={karsiTaraf.avukat}
              onChange={(e) => setKarsiTaraf({...karsiTaraf, avukat: e.target.value})}
              className="bg-gray-600 text-gray-100"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Güncelle
      </Button>
    </form>
  )
}

