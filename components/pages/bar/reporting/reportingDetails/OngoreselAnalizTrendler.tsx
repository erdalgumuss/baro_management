import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockTrendData = [
  { year: '2020', davaSayisi: 100, hakIhlali: 50 },
  { year: '2021', davaSayisi: 120, hakIhlali: 45 },
  { year: '2022', davaSayisi: 150, hakIhlali: 60 },
  { year: '2023', davaSayisi: 180, hakIhlali: 55 },
  { year: '2024', davaSayisi: 200, hakIhlali: 40 },
  { year: '2025', davaSayisi: 220, hakIhlali: 35 },
]

export default function OngoreselAnalizTrendler({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle>Öngöresel Analiz ve Trendler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="davaSayisi" stroke="#8884d8" name="Dava Sayısı" />
              <Line type="monotone" dataKey="hakIhlali" stroke="#82ca9d" name="Hak İhlali" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Öngörüler ve Trendler</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>Dava sayılarında yıllık ortalama %10 artış beklenmektedir.</li>
            <li>Hak ihlali vakalarında son yıllarda azalma trendi gözlemlenmektedir.</li>
            <li>Önümüzdeki 5 yıl içinde aile hukuku davalarında %15'lik bir artış öngörülmektedir.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

