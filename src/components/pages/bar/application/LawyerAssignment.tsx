'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { mockLawyers } from '@/utils/mockData'

export default function LawyerAssignment({ onAssign }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLawyers, setFilteredLawyers] = useState(mockLawyers)

  useEffect(() => {
    const results = mockLawyers.filter(lawyer =>
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredLawyers(results)
  }, [searchTerm])

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Avukat ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-700 text-gray-100"
      />
      <div className="max-h-40 overflow-y-auto space-y-2">
        {filteredLawyers.map((lawyer) => (
          <div key={lawyer.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
            <span>{lawyer.name}</span>
            <Button 
              onClick={() => onAssign(lawyer)}
              variant="outline"
              size="sm"
            >
              Ata
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

