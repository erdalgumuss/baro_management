import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export default function RaporGecmisi({ raporlar }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Rapor Geçmişi</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rapor Adı</TableHead>
            <TableHead>Oluşturma Tarihi</TableHead>
            <TableHead>Tür</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {raporlar.map((rapor) => (
            <TableRow key={rapor.id}>
              <TableCell>{rapor.baslik}</TableCell>
              <TableCell>{rapor.tarih}</TableCell>
              <TableCell>{rapor.tur}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Görüntüle</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

