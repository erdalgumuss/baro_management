import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DavaBelgeleri({ dava, onUpdate }) {
  const [yeniBelge, setYeniBelge] = useState({ ad: '', tur: '', dosya: null })

  const handleDosyaSecimi = (e) => {
    const file = e.target.files[0]
    setYeniBelge({ ...yeniBelge, dosya: file })
  }

  const handleBelgeEkle = () => {
    if (yeniBelge.ad && yeniBelge.tur && yeniBelge.dosya) {
      const yeniBelgeler = [...dava.belgeler, { ...yeniBelge, tarih: new Date().toISOString() }]
      onUpdate({ belgeler: yeniBelgeler })
      setYeniBelge({ ad: '', tur: '', dosya: null })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dava Belgeleri</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Belge Adı</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Yükleme Tarihi</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dava.belgeler.map((belge, index) => (
              <TableRow key={index}>
                <TableCell>{belge.ad}</TableCell>
                <TableCell>{belge.tur}</TableCell>
                <TableCell>{new Date(belge.tarih).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
                    İndir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Yeni Belge Ekle</h3>
        <div className="space-y-2">
          <Label htmlFor="belgeAdi">Belge Adı</Label>
          <Input
            id="belgeAdi"
            value={yeniBelge.ad}
            onChange={(e) => setYeniBelge({ ...yeniBelge, ad: e.target.value })}
            className="bg-gray-700 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="belgeTuru">Belge Türü</Label>
          <Input
            id="belgeTuru"
            value={yeniBelge.tur}
            onChange={(e) => setYeniBelge({ ...yeniBelge, tur: e.target.value })}
            className="bg-gray-700 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="belgeDosya">Dosya Seç</Label>
          <Input
            id="belgeDosya"
            type="file"
            onChange={handleDosyaSecimi}
            className="bg-gray-700 text-gray-100"
          />
        </div>
        <Button onClick={handleBelgeEkle} className="bg-green-600 hover:bg-green-700 text-white">
          Belge Ekle
        </Button>
      </div>
    </div>
  )
}

