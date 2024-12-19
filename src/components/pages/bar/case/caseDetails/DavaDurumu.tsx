import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DavaDurumu({ dava, onUpdate }) {
  const [durum, setDurum] = useState(dava.durum || 'aktif')
  const [yeniDurusma, setYeniDurusma] = useState({ tarih: '', saat: '', aciklama: '' })

  const handleDurumChange = (value) => {
    setDurum(value)
    onUpdate({ durum: value })
  }

  const handleDurusmaEkle = () => {
    const yeniDurusmalar = [...(dava.durusmalar || []), yeniDurusma]
    onUpdate({ durusmalar: yeniDurusmalar })
    setYeniDurusma({ tarih: '', saat: '', aciklama: '' })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="davaDurumu">Dava Durumu</Label>
        <Select value={durum} onValueChange={handleDurumChange}>
          <SelectTrigger id="davaDurumu" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-gray-100">
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="ertelenmis">Ertelenmiş</SelectItem>
            <SelectItem value="tamamlanmis">Tamamlanmış</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Duruşma Takvimi</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Saat</TableHead>
              <TableHead>Açıklama</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(dava.durusmalar || []).map((durusma, index) => (
              <TableRow key={index}>
                <TableCell>{durusma.tarih}</TableCell>
                <TableCell>{durusma.saat}</TableCell>
                <TableCell>{durusma.aciklama}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex space-x-2">
          <Input
            type="date"
            value={yeniDurusma.tarih}
            onChange={(e) => setYeniDurusma({...yeniDurusma, tarih: e.target.value})}
            className="bg-gray-700 text-gray-100"
          />
          <Input
            type="time"
            value={yeniDurusma.saat}
            onChange={(e) => setYeniDurusma({...yeniDurusma, saat: e.target.value})}
            className="bg-gray-700 text-gray-100"
          />
          <Input
            placeholder="Açıklama"
            value={yeniDurusma.aciklama}
            onChange={(e) => setYeniDurusma({...yeniDurusma, aciklama: e.target.value})}
            className="bg-gray-700 text-gray-100"
          />
          <Button onClick={handleDurusmaEkle} className="bg-green-600 hover:bg-green-700 text-white">
            Duruşma Ekle
          </Button>
        </div>
      </div>
    </div>
  )
}

