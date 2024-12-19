import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const kategoriler = [
  'Aile ve Özel Yaşam Hakkı',
  'Kadına Karşı Şiddet',
  'Eğitim Hakkı',
  'İfade Özgürlüğü',
  'Adil Yargılanma Hakkı',
  'Diğer'
]

export default function HakIhlaliKategoriIzleme({ hakIhlalleri }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredIhlaller = selectedCategory === 'all' 
    ? hakIhlalleri 
    : hakIhlalleri.filter(ihlal => ihlal.kategori === selectedCategory)

  const categoryData = kategoriler.map(kategori => ({
    name: kategori,
    count: hakIhlalleri.filter(ihlal => ihlal.kategori === kategori).length
  }))

  return (
    <div className="space-y-4">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Kategori seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Kategoriler</SelectItem>
          {kategoriler.map(kategori => (
            <SelectItem key={kategori} value={kategori}>{kategori}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Card>
        <CardHeader>
          <CardTitle>Kategori Bazında Hak İhlalleri</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIhlaller.map(ihlal => (
          <Card key={ihlal.id}>
            <CardHeader>
              <CardTitle>{ihlal.vakaBasligi}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Kategori:</strong> {ihlal.kategori}</p>
              <p><strong>Durum:</strong> {ihlal.durum}</p>
              <p><strong>Başvuru Tarihi:</strong> {ihlal.basvuruTarihi}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

