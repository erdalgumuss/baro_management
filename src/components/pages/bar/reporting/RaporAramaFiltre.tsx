'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function RaporAramaFiltre({ raporlar, onFilter }) {
  const [raporTuru, setRaporTuru] = useState('all')
  const [zamanAraligi, setZamanAraligi] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilter = () => {
    const filteredRaporlar = raporlar.filter((rapor) => {
      const raporTuruMatch = raporTuru === 'all' || rapor.tur === raporTuru
      const zamanAraligiMatch = zamanAraligi === 'all' || (
        zamanAraligi === 'custom' ? 
        ((!startDate || new Date(rapor.tarih) >= new Date(startDate)) &&
        (!endDate || new Date(rapor.tarih) <= new Date(endDate))) :
        rapor.zamanAraligi === zamanAraligi
      )
      return raporTuruMatch && zamanAraligiMatch
    })
    onFilter(filteredRaporlar)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-1/4">
          <Label htmlFor="raporTuru" className="text-gray-100">Rapor Türü</Label>
          <Select value={raporTuru} onValueChange={setRaporTuru}>
            <SelectTrigger id="raporTuru" className="w-full bg-gray-800 text-gray-100 border-gray-700">
              <SelectValue placeholder="Rapor türü seçin" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
              <SelectItem value="all">Tüm Raporlar</SelectItem>
              <SelectItem value="dava">Dava Raporu</SelectItem>
              <SelectItem value="hakIhlali">Hak İhlali Raporu</SelectItem>
              <SelectItem value="avukatPerformans">Avukat Performans Raporu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/4">
          <Label htmlFor="zamanAraligi" className="text-gray-100">Zaman Aralığı</Label>
          <Select value={zamanAraligi} onValueChange={setZamanAraligi}>
            <SelectTrigger id="zamanAraligi" className="w-full bg-gray-800 text-gray-100 border-gray-700">
              <SelectValue placeholder="Zaman aralığı seçin" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="son30gun">Son 30 Gün</SelectItem>
              <SelectItem value="son6ay">Son 6 Ay</SelectItem>
              <SelectItem value="buYil">Bu Yıl</SelectItem>
              <SelectItem value="custom">Özel Aralık</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {zamanAraligi === 'custom' && (
          <>
            <div className="w-full sm:w-1/4">
              <Label htmlFor="startDate" className="text-gray-100">Başlangıç Tarihi</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>
            <div className="w-full sm:w-1/4">
              <Label htmlFor="endDate" className="text-gray-100">Bitiş Tarihi</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>
          </>
        )}
      </div>
      <Button onClick={handleFilter} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
        Filtrele
      </Button>
    </div>
  )
}

