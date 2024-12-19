'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const kategoriRenkleri = {
  aileHakki: 'bg-purple-500',
  kadinaKarsiSiddet: 'bg-red-500',
  cocukHaklari: 'bg-green-500',
  ifadeOzgurlugu: 'bg-blue-500',
}

const durumRenkleri = {
  'İşlemde': 'bg-yellow-500',
  'Tamamlandı': 'bg-green-500',
  'İptal Edildi': 'bg-red-500',
}

export default function HakIhlaliListesi({ hakIhlalleri, onHakIhlaliSelect }) {
  return (
    <Table className="border-gray-700">
      <TableHeader>
        <TableRow className="hover:bg-gray-800 border-gray-700">
          <TableHead className="text-gray-300">Vaka Başlığı</TableHead>
          <TableHead className="text-gray-300">Başvuran Kişi</TableHead>
          <TableHead className="text-gray-300">Kategori</TableHead>
          <TableHead className="text-gray-300">Kaynak</TableHead>
          <TableHead className="text-gray-300">Durum</TableHead>
          <TableHead className="text-gray-300">Başvuru Tarihi</TableHead>
          <TableHead className="text-gray-300">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hakIhlalleri.map((ihlal) => (
          <TableRow key={ihlal.id} className="hover:bg-gray-800 border-gray-700">
            <TableCell className="text-gray-100">{ihlal.vakaBasligi}</TableCell>
            <TableCell className="text-gray-100">{ihlal.basvuranKisi}</TableCell>
            <TableCell className="text-gray-100">
              <Badge className={`${kategoriRenkleri[ihlal.kategori]} text-white`}>
                {ihlal.kategori}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-100">{ihlal.kaynak}</TableCell>
            <TableCell className="text-gray-100">
              <Badge className={`${durumRenkleri[ihlal.durum]} text-white`}>
                {ihlal.durum}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-100">{ihlal.basvuruTarihi}</TableCell>
            <TableCell>
              <Button 
                onClick={() => onHakIhlaliSelect(ihlal)} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Detaylar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

