import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function TaraflarBilgisi({ hakIhlali, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="basvuranAdi">Başvuran Adı</Label>
        <Input
          id="basvuranAdi"
          value={hakIhlali.basvuranAdi}
          onChange={(e) => onChange('basvuranAdi', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="basvuranIletisim">İletişim Bilgileri</Label>
        <Input
          id="basvuranIletisim"
          value={hakIhlali.basvuranIletisim}
          onChange={(e) => onChange('basvuranIletisim', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="basvuruMetni">Başvuru Metni</Label>
        <Textarea
          id="basvuruMetni"
          value={hakIhlali.basvuruMetni}
          onChange={(e) => onChange('basvuruMetni', e.target.value)}
          className="bg-gray-700 text-gray-100"
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="hukukiTemsilci">Hukuki Temsilci</Label>
        <Input
          id="hukukiTemsilci"
          value={hakIhlali.hukukiTemsilci}
          onChange={(e) => onChange('hukukiTemsilci', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="olayBildirenKurum">Olayı Bildiren STK veya Medya</Label>
        <Input
          id="olayBildirenKurum"
          value={hakIhlali.olayBildirenKurum}
          onChange={(e) => onChange('olayBildirenKurum', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
    </div>
  )
}

