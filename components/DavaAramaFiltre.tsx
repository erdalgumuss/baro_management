'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function DavaAramaFiltre({ davalar, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState('all')
  const [durumFilter, setDurumFilter] = useState('all')

  const handleFilter = () => {
    const filteredDavalar = davalar.filter(dava => 
      (dava.davaNumarasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
       dava.davaAdi.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (kategoriFilter === 'all' || dava.kategori === kategoriFilter) &&
      (durumFilter === 'all' || dava.durum === durumFilter)
    )
    onFilter(filteredDavalar)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Dava numarası veya adı ile ara..."
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
            <SelectItem value="ceza">Ceza Davası</SelectItem>
            <SelectItem value="hukuk">Hukuk Davası</SelectItem>
            <SelectItem value="idari">İdari Dava</SelectItem>
          </SelectContent>
        </Select>
        <Select value={durumFilter} onValueChange={setDurumFilter}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
            <SelectItem value="ertelendi">Ertelendi</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleFilter} className="bg-blue-600 hover:bg-blue-700 text-white">
          Filtrele
        </Button>
      </div>
    </div>
  )
}

