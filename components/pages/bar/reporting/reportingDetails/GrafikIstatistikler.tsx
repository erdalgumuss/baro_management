import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const mockData = {
  davaTurleri: [
    { name: 'Aile', value: 30 },
    { name: 'Ticaret', value: 25 },
    { name: 'Ceza', value: 20 },
    { name: 'İş', value: 15 },
    { name: 'İdare', value: 10 },
  ],
  davaSonuclari: [
    { name: 'Kazanılan', value: 60 },
    { name: 'Kaybedilen', value: 30 },
    { name: 'İptal Edilen', value: 10 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function GrafikIstatistikler({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle>Grafik ve İstatistikler</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.davaTurleri}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.davaSonuclari}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockData.davaSonuclari.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

