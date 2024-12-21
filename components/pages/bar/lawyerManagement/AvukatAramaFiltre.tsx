import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AvukatAramaFiltre({ lawyers, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('all')

  const handleFilter = () => {
    const filteredLawyers = lawyers.filter(lawyer => 
      (lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (specializationFilter === 'all' || lawyer.specialization === specializationFilter)
    )
    onFilter(filteredLawyers)
  }

  return (
    <div className="flex space-x-4 mb-4">
      <Input
        placeholder="Avukat adı veya uzmanlık alanı ile ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow bg-gray-800 text-gray-100 border-gray-700"
      />
      <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
        <SelectTrigger className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
          <SelectValue placeholder="Uzmanlık alanı" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="Ceza Hukuku">Ceza Hukuku</SelectItem>
          <SelectItem value="Medeni Hukuk">Medeni Hukuku</SelectItem>
          <SelectItem value="İş Hukuku">İş Hukuku</SelectItem>
          <SelectItem value="İdare Hukuku">İdare Hukuku</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleFilter} className="bg-blue-600 hover:bg-blue-700 text-white">
        Filtrele
      </Button>
    </div>
  )
}

