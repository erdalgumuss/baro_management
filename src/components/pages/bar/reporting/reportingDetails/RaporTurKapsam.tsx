import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RaporTurKapsam({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle>Rapor Türü ve Kapsamı</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold">Rapor Türü: </span>
            <Badge variant="secondary">{rapor.tur}</Badge>
          </div>
          <div>
            <span className="font-semibold">Zaman Aralığı: </span>
            {rapor.zamanAraligi}
          </div>
          <div>
            <span className="font-semibold">Durum: </span>
            <Badge variant="outline">{rapor.durum}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

