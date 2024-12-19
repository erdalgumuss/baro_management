import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface DavaAramaFiltreProps {
  onFilter: (filteredDavalar: any[]) => void
  davalar: any[]
}

export function DavaAramaFiltre({ onFilter, davalar }: DavaAramaFiltreProps) {
  const [aramaTermi, setAramaTermi] = useState('')
  const [kategori, setKategori] = useState('tumu')
  const [durum, setDurum] = useState('tumu')

  const handleFilter = () => {
    const filteredDavalar = davalar.filter(dava => 
      (dava.ad.toLowerCase().includes(aramaTermi.toLowerCase()) ||
       dava.numara.includes(aramaTermi)) &&
      (kategori === 'tumu' || dava.kategori === kategori) &&
      (durum === 'tumu' || dava.durum === durum)
    )
    onFilter(filteredDavalar)
  }

  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <Input
        placeholder="Dava adı veya numarası ile ara..."
        value={aramaTermi}
        onChange={(e) => setAramaTermi(e.target.value)}
        className="bg-gray-700 text-gray-100 border-gray-600"
      />
      <div className="flex space-x-4">
        <Select value={kategori} onValueChange={setKategori}>
          <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tumu">Tümü</SelectItem>
            <SelectItem value="aile">Aile</SelectItem>
            <SelectItem value="ticaret">Ticaret</SelectItem>
            <SelectItem value="ceza">Ceza</SelectItem>
          </SelectContent>
        </Select>
        <Select value={durum} onValueChange={setDurum}>
          <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tumu">Tümü</SelectItem>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="tamamlanmis">Tamamlanmış</SelectItem>
            <SelectItem value="beklemede">Beklemede</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleFilter} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Filtrele</Button>
    </div>
  )
}

