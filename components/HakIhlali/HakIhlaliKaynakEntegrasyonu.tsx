import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HakIhlaliKaynakEntegrasyonu({ onYeniIhlal }) {
  const [kaynak, setKaynak] = useState('')
  const [kaynakDetay, setKaynakDetay] = useState('')
  const [kategori, setKategori] = useState('')
  const [vakaBasligi, setVakaBasligi] = useState('')
  const [vakaDetay, setVakaDetay] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onYeniIhlal({
      kaynak,
      kaynakDetay,
      kategori,
      vakaBasligi,
      detaylar: vakaDetay,
      durum: 'İşlemde',
      basvuruTarihi: new Date().toISOString().split('T')[0]
    })
    // Reset form
    setKaynak('')
    setKaynakDetay('')
    setKategori('')
    setVakaBasligi('')
    setVakaDetay('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Hak İhlali Bildirimi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={kaynak} onValueChange={setKaynak}>
            <SelectTrigger>
              <SelectValue placeholder="Kaynak seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medya">Medya</SelectItem>
              <SelectItem value="stk">STK</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Kaynak Detayı (Medya adresi veya STK adı)"
            value={kaynakDetay}
            onChange={(e) => setKaynakDetay(e.target.value)}
          />

          <Select value={kategori} onValueChange={setKategori}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aile ve Özel Yaşam Hakkı">Aile ve Özel Yaşam Hakkı</SelectItem>
              <SelectItem value="Kadına Karşı Şiddet">Kadına Karşı Şiddet</SelectItem>
              <SelectItem value="Eğitim Hakkı">Eğitim Hakkı</SelectItem>
              <SelectItem value="İfade Özgürlüğü">İfade Özgürlüğü</SelectItem>
              <SelectItem value="Adil Yargılanma Hakkı">Adil Yargılanma Hakkı</SelectItem>
              <SelectItem value="Diğer">Diğer</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Vaka Başlığı"
            value={vakaBasligi}
            onChange={(e) => setVakaBasligi(e.target.value)}
          />

          <Textarea
            placeholder="Vaka Detayı"
            value={vakaDetay}
            onChange={(e) => setVakaDetay(e.target.value)}
            rows={4}
          />

          <Button type="submit">Hak İhlali Bildir</Button>
        </form>
      </CardContent>
    </Card>
  )
}

