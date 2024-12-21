'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RaporlamaAraci() {
  const [baslangicTarihi, setBaslangicTarihi] = useState('')
  const [bitisTarihi, setBitisTarihi] = useState('')
  const [raporTuru, setRaporTuru] = useState('')

  const handleRaporOlustur = () => {
    // Burada rapor oluşturma mantığını uygulayın
    console.log('Rapor oluşturuluyor:', { baslangicTarihi, bitisTarihi, raporTuru })
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label htmlFor="baslangicTarihi" className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
          <Input
            type="date"
            id="baslangicTarihi"
            value={baslangicTarihi}
            onChange={(e) => setBaslangicTarihi(e.target.value)}
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="bitisTarihi" className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
          <Input
            type="date"
            id="bitisTarihi"
            value={bitisTarihi}
            onChange={(e) => setBitisTarihi(e.target.value)}
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="raporTuru" className="block text-sm font-medium text-gray-700">Rapor Türü</label>
          <Select value={raporTuru} onValueChange={setRaporTuru}>
            <SelectTrigger id="raporTuru">
              <SelectValue placeholder="Rapor türü seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="durusmaTarihleri">Duruşma Tarihleri</SelectItem>
              <SelectItem value="davaSureci">Dava Süreci</SelectItem>
              <SelectItem value="performans">Performans Raporu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleRaporOlustur}>Rapor Oluştur</Button>
    </div>
  )
}

