import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function DavaIstatistikleri({ dava }) {
  // Bu veriler normalde bir API'den alınacaktır. Şimdilik mock data kullanıyoruz.
  const benzerDavalar = [
    { name: 'Kabul', value: 30 },
    { name: 'Red', value: 20 },
    { name: 'Kısmen Kabul', value: 15 },
    { name: 'Sulh', value: 10 },
  ]

  const ortalamaKararSuresi = 180 // gün cinsinden

  const tahminiKararSuresi = () => {
    const buguneTahminiSure = Math.floor((new Date() - new Date(dava.baslangicTarihi)) / (1000 * 60 * 60 * 24))
    return Math.max(0, ortalamaKararSuresi - buguneTahminiSure)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Dava İstatistikleri</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Benzer Davaların Sonuçları</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={benzerDavalar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dava Süresi Analizi</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ortalama Karar Süresi: {ortalamaKararSuresi} gün</p>
            <p>Tahmini Kalan Süre: {tahminiKararSuresi()} gün</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

