import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function BelgelerDosyalar({ hakIhlali, onChange }) {
  const [yeniDosya, setYeniDosya] = useState({ ad: '', tur: '', dosya: null })

  const handleDosyaSecimi = (e) => {
    const file = e.target.files[0]
    setYeniDosya({ ...yeniDosya, dosya: file })
  }

  const handleDosyaEkle = () => {
    if (yeniDosya.ad && yeniDosya.tur && yeniDosya.dosya) {
      const yeniDosyalar = [...hakIhlali.dosyalar, { ...yeniDosya, tarih: new Date().toISOString() }]
      onChange('dosyalar', yeniDosyalar)
      setYeniDosya({ ad: '', tur: '', dosya: null })
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dosya Adı</TableHead>
            <TableHead>Tür</TableHead>
            <TableHead>Yükleme Tarihi</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hakIhlali.dosyalar && hakIhlali.dosyalar.map((dosya, index) => (
            <TableRow key={index}>
              <TableCell>{dosya.ad}</TableCell>
              <TableCell>{dosya.tur}</TableCell>
              <TableCell>{new Date(dosya.tarih).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">İndir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-2">
        <Label htmlFor="dosyaAdi">Dosya Adı</Label>
        <Input
          id="dosyaAdi"
          value={yeniDosya.ad}
          onChange={(e) => setYeniDosya({ ...yeniDosya, ad: e.target.value })}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dosyaTuru">Dosya Türü</Label>
        <Input
          id="dosyaTuru"
          value={yeniDosya.tur}
          onChange={(e) => setYeniDosya({ ...yeniDosya, tur: e.target.value })}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dosyaSecimi">Dosya Seç</Label>
        <Input
          id="dosyaSecimi"
          type="file"
          onChange={handleDosyaSecimi}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <Button onClick={handleDosyaEkle}>Dosya Ekle</Button>
    </div>
  )
}

