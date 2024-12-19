import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HakIhlaliSonuclandirma({ hakIhlalleri, onUpdate }) {
  const [selectedIhlal, setSelectedIhlal] = useState(null)
  const [sonuc, setSonuc] = useState('')
  const [finalRapor, setFinalRapor] = useState('')

  const handleIhlalSelect = (id) => {
    const ihlal = hakIhlalleri.find(i => i.id.toString() === id)
    setSelectedIhlal(ihlal)
    setSonuc(ihlal.sonuc || '')
    setFinalRapor(ihlal.finalRapor || '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedIhlal) {
      onUpdate({
        ...selectedIhlal,
        sonuc,
        finalRapor,
        durum: 'Tamamlandı'
      })
      setSelectedIhlal(null)
      setSonuc('')
      setFinalRapor('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hak İhlali Sonuçlandırma</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select onValueChange={handleIhlalSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Hak ihlali seçin" />
            </SelectTrigger>
            <SelectContent>
              {hakIhlalleri.map(ihlal => (
                <SelectItem key={ihlal.id} value={ihlal.id.toString()}>
                  {ihlal.vakaBasligi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedIhlal && (
            <>
              <Input
                placeholder="Sonuç"
                value={sonuc}
                onChange={(e) => setSonuc(e.target.value)}
              />

              <Textarea
                placeholder="Final Raporu"
                value={finalRapor}
                onChange={(e) => setFinalRapor(e.target.value)}
                rows={4}
              />

              <Button type="submit">Sonuçlandır</Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

