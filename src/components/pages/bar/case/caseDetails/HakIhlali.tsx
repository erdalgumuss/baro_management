import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function HakIhlali({ dava, onUpdate }) {
  const [hakIhlali, setHakIhlali] = useState(dava.hakIhlali || { kategori: '', aciklama: '' })

  const handleUpdate = () => {
    onUpdate({ hakIhlali })
  }

  const hakIhlaliKategorileri = [
    'Aile Hakkı',
    'Ayrımcılık',
    'Çalışma Hakkı',
    'Eğitim Hakkı',
    'İfade Özgürlüğü',
    'Kişi Özgürlüğü ve Güvenliği',
    'Mülkiyet Hakkı',
    'Sağlık Hakkı',
    'Yaşam Hakkı',
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="hakIhlaliKategori">Hak İhlali Kategorisi</Label>
        <Select 
          value={hakIhlali.kategori} 
          onValueChange={(value) => setHakIhlali({ ...hakIhlali, kategori: value })}
        >
          <SelectTrigger id="hakIhlaliKategori" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-gray-100">
            {hakIhlaliKategorileri.map((kategori) => (
              <SelectItem key={kategori} value={kategori}>
                {kategori}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hakIhlaliAciklama">Hak İhlali Açıklaması</Label>
        <Textarea
          id="hakIhlaliAciklama"
          value={hakIhlali.aciklama}
          onChange={(e) => setHakIhlali({ ...hakIhlali, aciklama: e.target.value })}
          className="bg-gray-700 text-gray-100"
          rows={4}
        />
      </div>

      <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">
        Güncelle
      </Button>
    </div>
  )
}

