import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function VakaOzeti({ hakIhlali, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="vakaBasligi">Vaka Başlığı</Label>
        <Input
          id="vakaBasligi"
          value={hakIhlali.vakaBasligi}
          onChange={(e) => onChange('vakaBasligi', e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="olayOzeti">Olay Özeti</Label>
        <Textarea
          id="olayOzeti"
          value={hakIhlali.olayOzeti}
          onChange={(e) => onChange('olayOzeti', e.target.value)}
          className="bg-gray-700 text-gray-100"
          rows={5}
        />
      </div>
    </div>
  )
}

