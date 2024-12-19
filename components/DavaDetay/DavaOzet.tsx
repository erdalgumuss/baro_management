import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function DavaOzet({ dava, onUpdate }) {
  const [davaAdi, setDavaAdi] = useState(dava.davaAdi)
  const [davaOzeti, setDavaOzeti] = useState(dava.davaOzeti)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ davaAdi, davaOzeti })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="davaAdi">Dava Adı</Label>
        <Input
          id="davaAdi"
          value={davaAdi}
          onChange={(e) => setDavaAdi(e.target.value)}
          className="bg-gray-700 text-gray-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="davaOzeti">Dava Özeti</Label>
        <Textarea
          id="davaOzeti"
          value={davaOzeti}
          onChange={(e) => setDavaOzeti(e.target.value)}
          className="bg-gray-700 text-gray-100"
          rows={5}
        />
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Güncelle
      </Button>
    </form>
  )
}

