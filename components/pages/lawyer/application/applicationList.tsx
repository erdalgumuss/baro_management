import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BasvuruListesi({ basvurular = [], onDavaSelect, onBasvuruOnayla, onDavaAc }) {
  if (!basvurular || basvurular.length === 0) {
    return <p className="text-center py-4">Henüz başvuru bulunmamaktadır.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Başvuru No</TableHead>
          <TableHead>Başvuran</TableHead>
          <TableHead>Konu</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {basvurular.map((basvuru) => (
          <TableRow key={basvuru.id} className="cursor-pointer" 
          onClick={() => onDavaSelect(basvuru)} // Modal açma işlevini tetikler
          >
            <TableCell>{basvuru.basvuruNo}</TableCell>
            <TableCell>{basvuru.basvuranAd}</TableCell>
            <TableCell>{basvuru.konu}</TableCell>
            <TableCell>{basvuru.tarih}</TableCell>
            <TableCell>
              <Badge variant={basvuru.durum === 'Yeni' ? 'default' : 'secondary'}>
                {basvuru.durum}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {basvuru.durum === 'Yeni' && (
                  <Button onClick={(e) => { e.stopPropagation(); onBasvuruOnayla(basvuru.id); }}>Onayla</Button>
                )}
                {basvuru.durum === 'Onaylandı' && (
                  <Button onClick={(e) => { e.stopPropagation(); onDavaAc(basvuru.id); }}>Dava Aç</Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}