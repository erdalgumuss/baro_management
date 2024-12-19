import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const mockTableData = [
  { id: 1, davaTuru: 'Aile', basvuran: 'Ahmet Yılmaz', durum: 'Devam Ediyor', tarih: '2024-01-15', avukat: 'Av. Mehmet Öz', sure: '3 ay' },
  { id: 2, davaTuru: 'Ticaret', basvuran: 'Ayşe Kaya', durum: 'Sonuçlandı', tarih: '2024-02-20', avukat: 'Av. Zeynep Demir', sure: '6 ay' },
  { id: 3, davaTuru: 'Ceza', basvuran: 'Ali Veli', durum: 'Devam Ediyor', tarih: '2024-03-10', avukat: 'Av. Hasan Yılmaz', sure: '2 ay' },
]

export default function DetayliVeriTablosu({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle>Detaylı Veri Tablosu</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dava Türü</TableHead>
              <TableHead>Başvuran</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Avukat</TableHead>
              <TableHead>Süre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.davaTuru}</TableCell>
                <TableCell>{row.basvuran}</TableCell>
                <TableCell>{row.durum}</TableCell>
                <TableCell>{row.tarih}</TableCell>
                <TableCell>{row.avukat}</TableCell>
                <TableCell>{row.sure}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button variant="outline">Excel olarak İndir</Button>
        </div>
      </CardContent>
    </Card>
  )
}

