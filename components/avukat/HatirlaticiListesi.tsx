import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell } from 'lucide-react'

export function HatirlaticiListesi() {
  // Bu mock veriyi gerçek verilerle değiştirin
  const hatirlaticilar = [
    { id: 1, mesaj: 'Yılmaz vs. ABC Şirketi duruşması', tarih: new Date(2023, 5, 15), saat: '10:00' },
    { id: 2, mesaj: 'Kaya Ailesi Veraset belgelerini hazırla', tarih: new Date(2023, 5, 18), saat: '09:00' },
    { id: 3, mesaj: 'Müvekkil görüşmesi', tarih: new Date(2023, 5, 25), saat: '15:30' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Hatırlatıcılar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hatirlaticilar.map((hatirlatici) => (
          <div key={hatirlatici.id} className="mb-4 p-3 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <Badge>{hatirlatici.tarih.toLocaleDateString()}</Badge>
              <span className="text-sm font-medium">{hatirlatici.saat}</span>
            </div>
            <p className="text-sm">{hatirlatici.mesaj}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

