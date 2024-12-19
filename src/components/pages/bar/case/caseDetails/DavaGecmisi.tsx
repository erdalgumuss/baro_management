import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DavaGecmisi({ dava }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dava Geçmişi</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead>İşlem</TableHead>
            <TableHead>Açıklama</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dava.gecmis.map((islem, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(islem.tarih).toLocaleDateString()}</TableCell>
              <TableCell>{islem.islem}</TableCell>
              <TableCell>{islem.aciklama}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

