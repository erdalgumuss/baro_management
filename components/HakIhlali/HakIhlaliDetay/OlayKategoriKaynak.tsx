import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const kategoriler = [
  'Aile ve Özel Yaşam Hakkı',
  'Kadına Karşı Şiddet',
  'Eğitim Hakkı',
  'İfade Özgürlüğü',
  'Adil Yargılanma Hakkı',
  'Diğer'
]

export default function OlayKategoriKaynak({ hakIhlali, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="kategori">Olay Kategorisi</Label>
        <Select
          value={hakIhlali.kategori}
          onValueChange={(value) => onChange('kategori', value)}
        >
          <SelectTrigger id="kategori" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            {kategoriler.map((kategori) => (
              <SelectItem key={kategori} value={kategori}>{kategori}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="kaynak">Kaynak</Label>
        <Select
          value={hakIhlali.kaynak}
          onValueChange={(value) => onChange('kaynak', value)}
        >
          <SelectTrigger id="kaynak" className="bg-gray-700 text-gray-100">
            <SelectValue placeholder="Kaynak seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="medya">Medya</SelectItem>
            <SelectItem value="stk">STK</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="kaynakDetay">Kaynak Detayı</Label>
        <Input
          id="kaynakDetay"
          value={hakIhlali.kaynakDetay}
          onChange={(e) => onChange('kaynakDetay', e.target.value)}
          placeholder={hakIhlali.kaynak === 'medya' ? 'Medya adresi' : 'STK/STÖ bilgisi'}
          className="bg-gray-700 text-gray-100"
        />
      </div>
    </div>
  )
}

