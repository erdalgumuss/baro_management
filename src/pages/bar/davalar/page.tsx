'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import DavaAramaFiltre from '@/components/pages/bar/case/DavaAramaFiltre'
import DavaListesi from '@/components/pages/bar/case/DavaListesi'
import DavaDetay from '@/components/pages/bar/case/DavaDetay'
import DavaEkleForm from '@/components/pages/bar/case/DavaEkleForm'
import { Button } from '@/components/ui/button'
import { mockDavalar } from '@/utils/mockData'

export default function DavaYonetimiPage() {
  const [davalar, setDavalar] = useState(mockDavalar || [])
  const [filteredDavalar, setFilteredDavalar] = useState(mockDavalar || [])
  const [selectedDava, setSelectedDava] = useState(null)
  const [showDavaEkleForm, setShowDavaEkleForm] = useState(false)

  useEffect(() => {
    const fetchDavalar = async () => {
      setDavalar(mockDavalar || [])
      setFilteredDavalar(mockDavalar || [])
    }

    fetchDavalar()
  }, [])

  const handleFilter = (filteredDavalar) => {
    setFilteredDavalar(filteredDavalar)
  }

  const handleDavaSelect = (dava) => {
    setSelectedDava(dava)
  }

  const handleDavaUpdate = (updatedDava) => {
    const updatedDavalar = davalar.map(dava => 
      dava.id === updatedDava.id ? updatedDava : dava
    )
    setDavalar(updatedDavalar)
    setFilteredDavalar(updatedDavalar)
    setSelectedDava(null)
  }

  const handleDavaEkle = (yeniDava) => {
    const yeniDavalar = [...davalar, { ...yeniDava, id: Date.now() }]
    setDavalar(yeniDavalar)
    setFilteredDavalar(yeniDavalar)
    setShowDavaEkleForm(false)
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dava Yönetimi</h1>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowDavaEkleForm(true)}
          >
            Yeni Dava Ekle
          </Button>
        </div>

        <DavaAramaFiltre davalar={davalar} onFilter={handleFilter} />

        <DavaListesi 
          davalar={filteredDavalar} 
          onDavaSelect={handleDavaSelect}
        />

        {selectedDava && (
          <DavaDetay
            dava={selectedDava}
            onClose={() => setSelectedDava(null)}
            onUpdate={handleDavaUpdate}
          />
        )}

        {showDavaEkleForm && (
          <DavaEkleForm
            onClose={() => setShowDavaEkleForm(false)}
            onSubmit={handleDavaEkle}
          />
        )}
      </div>
    </BaroDashboard>
  )
}

