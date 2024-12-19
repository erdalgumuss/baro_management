'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
export default function DavaListesi({ davalar = [], onDavaSelect }) {
  return (
    <Table className="border-gray-700">
      <TableHeader>
        <TableRow className="hover:bg-gray-800 border-gray-700">
          <TableHead className="text-gray-300">Dava Numarası</TableHead>
          <TableHead className="text-gray-300">Dava Adı</TableHead>
          <TableHead className="text-gray-300">Başvuran</TableHead>
          <TableHead className="text-gray-300">Avukat</TableHead>
          <TableHead className="text-gray-300">Durum</TableHead>
          <TableHead className="text-gray-300">Başlangıç Tarihi</TableHead>
          <TableHead className="text-gray-300">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {davalar && davalar.length > 0 ? (
          davalar.map((dava) => (
            <TableRow key={dava.id} className="hover:bg-gray-800 border-gray-700">
              <TableCell className="text-gray-100">{dava.davaNumarasi}</TableCell>
              <TableCell className="text-gray-100">{dava.davaAdi}</TableCell>
              <TableCell className="text-gray-100">{dava.basvuran.adiSoyadi}</TableCell>
              <TableCell className="text-gray-100">{dava.avukat}</TableCell>
              <TableCell className="text-gray-100">{dava.durum}</TableCell>
              <TableCell className="text-gray-100">{dava.baslangicTarihi}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => onDavaSelect(dava)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Detaylar
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-gray-100">Dava bulunamadı.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

