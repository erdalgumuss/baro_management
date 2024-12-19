import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function DavaKapanis({ dava, onUpdate }) {
  const [sonuc, setSonuc] = useState(dava.sonuc || '')
  const [kapanisTarihi, setKapanisTarihi] = useState(dava.kapanisTarihi || '')
  const [kapanisAciklamasi, setKapanisAciklamasi] = useState(dava.kapanisAciklamasi || '')

  const handleKapanis = () => {
    onUpdate({
      sonuc,
      kapanisTarihi,
      kapanisAciklamasi,
      durum: 'Kapandı'
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dava Kapanış</h3>
      <div className="space-y-2">
        <Label htmlFor="sonuc">Dava Sonucu</Label>
        <Select value={sonuc} onValueChange={setSonuc}>
          <SelectTrigger id="sonuc">
            <SelectValue placeholder="Sonuç seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kabul">Kabul</SelectItem>
            <SelectItem value="Red">Red</SelectItem>
            <SelectItem value="Kısmen Kabul">Kısmen Kabul</SelectItem>
            <SelectItem value="Sulh">Sulh</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="kapanisTarihi">Kapanış Tarihi</Label>
        <Input
          id="kapanisTarihi"
          type="date"
          value={kapanisTarihi}
          onChange={(e) => setKapanisTarihi(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="kapanisAciklamasi">Kapanış Açıklaması</Label>
        <Textarea
          id="kapanisAciklamasi"
          value={kapanisAciklamasi}
          onChange={(e) => setKapanisAciklamasi(e.target.value)}
          rows={4}
        />
      </div>
      <Button onClick={handleKapanis} className="bg-red-600 hover:bg-red-700 text-white">
        Davayı Kapat
      </Button>
    </div>
  )
}

