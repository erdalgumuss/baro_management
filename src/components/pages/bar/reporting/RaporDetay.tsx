import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RaporDetay({ rapor }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>{rapor.baslik}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div><strong>Rapor Türü:</strong> {rapor.tur}</div>
            <div><strong>Zaman Aralığı:</strong> {rapor.zamanAraligi}</div>
            <div>
              <strong>Durum:</strong> <Badge>{rapor.durum}</Badge>
            </div>
            <div><strong>Oluşturma Tarihi:</strong> {rapor.tarih}</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Rapor İçeriği</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{rapor.icerik || 'Bu rapor için detaylı içerik bulunmamaktadır.'}</p>
        </CardContent>
      </Card>
      {/* Add more sections here based on the report type */}
    </div>
  )
}

