'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
// import { DatePickerWithRange } from '@/components/ui/date-range-picker' // Removed as per update 1

export default function HakIhlaliAramaFiltre({ hakIhlalleri, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState('all')
  const [kaynakFilter, setKaynakFilter] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilter = () => {
    const filteredIhlaller = hakIhlalleri.filter(ihlal => 
      (ihlal.vakaBasligi.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ihlal.basvuranKisi.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (kategoriFilter === 'all' || ihlal.kategori === kategoriFilter) &&
      (kaynakFilter === 'all' || ihlal.kaynak === kaynakFilter) &&
      (!startDate || new Date(ihlal.basvuruTarihi) >= new Date(startDate)) &&
      (!endDate || new Date(ihlal.basvuruTarihi) <= new Date(endDate))
    )
    onFilter(filteredIhlaller)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Vaka adı veya başvuran kişi ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-gray-800 text-gray-100 border-gray-700"
        />
        <Select value={kategoriFilter} onValueChange={setKategoriFilter}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            <SelectItem value="aileHakki">Aile Hakkı</SelectItem>
            <SelectItem value="kadinaKarsiSiddet">Kadına Karşı Şiddet</SelectItem>
            <SelectItem value="cocukHaklari">Çocuk Hakları</SelectItem>
            <SelectItem value="ifadeOzgurlugu">İfade Özgürlüğü</SelectItem>
          </SelectContent>
        </Select>
        <Select value={kaynakFilter} onValueChange={setKaynakFilter}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Kaynak" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="all">Tüm Kaynaklar</SelectItem>
            <SelectItem value="medya">Medya</SelectItem>
            <SelectItem value="stk">STK</SelectItem>
            <SelectItem value="bireyselBasvuru">Bireysel Başvuru</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-4 items-center">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-gray-100 border-gray-700"
        />
        <span className="text-gray-100">-</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-gray-100 border-gray-700"
        />
        <Button onClick={handleFilter} className="bg-blue-600 hover:bg-blue-700 text-white">
          Filtrele
        </Button>
      </div>
    </div>
  )
}

