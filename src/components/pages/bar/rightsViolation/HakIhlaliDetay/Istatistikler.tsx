import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockData = [
  { name: 'Ocak', vakaSayisi: 12 },
  { name: 'Şubat', vakaSayisi: 19 },
  { name: 'Mart', vakaSayisi: 15 },
  { name: 'Nisan', vakaSayisi: 22 },
  { name: 'Mayıs', vakaSayisi: 18 },
  { name: 'Haziran', vakaSayisi: 25 },
]

export default function Istatistikler() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Aylık Hak İhlali Vakaları</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vakaSayisi" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

