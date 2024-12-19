import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DurusmaListesiProps {
  selectedDate: Date | null
}

export function DurusmaListesi({ selectedDate }: DurusmaListesiProps) {
  // Bu mock veriyi gerçek verilerle değiştirin
  const durusmalar = [
    { id: 1, tarih: new Date(2023, 5, 15), davaAdi: 'Yılmaz vs. ABC Şirketi', mahkeme: 'İstanbul 3. Asliye Hukuk Mahkemesi', saat: '10:00' },
    { id: 2, tarih: new Date(2023, 5, 20), davaAdi: 'Kaya Ailesi Veraset', mahkeme: 'Ankara 2. Asliye Hukuk Mahkemesi', saat: '14:30' },
    { id: 3, tarih: new Date(2023, 5, 25), davaAdi: 'Demir İş Davası', mahkeme: 'İzmir İş Mahkemesi', saat: '11:15' },
  ]

  const filteredDurusmalar = selectedDate
    ? durusmalar.filter(durusma => durusma.tarih.toDateString() === selectedDate.toDateString())
    : durusmalar

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tarih</TableHead>
          <TableHead>Saat</TableHead>
          <TableHead>Dava Adı</TableHead>
          <TableHead>Mahkeme</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDurusmalar.map((durusma) => (
          <TableRow key={durusma.id}>
            <TableCell>{durusma.tarih.toLocaleDateString()}</TableCell>
            <TableCell>{durusma.saat}</TableCell>
            <TableCell>{durusma.davaAdi}</TableCell>
            <TableCell>{durusma.mahkeme}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

