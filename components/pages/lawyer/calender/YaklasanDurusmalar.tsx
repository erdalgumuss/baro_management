import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface YaklasanDurusmalarProps {
  onSelectDurusma: (durusma: any) => void
}

export function YaklasanDurusmalar({ onSelectDurusma }: YaklasanDurusmalarProps) {
  // Bu mock veriyi gerçek verilerle değiştirin
  const yaklasanDurusmalar = [
    { id: 1, tarih: new Date(2023, 5, 15), davaAdi: 'Yılmaz vs. ABC Şirketi', mahkeme: 'İstanbul 3. Asliye Hukuk Mahkemesi', saat: '10:00' },
    { id: 2, tarih: new Date(2023, 5, 20), davaAdi: 'Kaya Ailesi Veraset', mahkeme: 'Ankara 2. Asliye Hukuk Mahkemesi', saat: '14:30' },
    { id: 3, tarih: new Date(2023, 5, 25), davaAdi: 'Demir İş Davası', mahkeme: 'İzmir İş Mahkemesi', saat: '11:15' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yaklaşan Duruşmalar</CardTitle>
      </CardHeader>
      <CardContent>
        {yaklasanDurusmalar.map((durusma) => (
          <div 
            key={durusma.id} 
            className="mb-4 p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectDurusma(durusma)}
          >
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline">{durusma.tarih.toLocaleDateString()}</Badge>
              <span className="text-sm font-medium">{durusma.saat}</span>
            </div>
            <h4 className="font-semibold">{durusma.davaAdi}</h4>
            <p className="text-sm text-gray-600">{durusma.mahkeme}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

