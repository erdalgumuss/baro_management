'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/BaroDashboard'
import RaporAramaFiltre from '@/components/Raporlama/RaporAramaFiltre'
import RaporListesi from '@/components/Raporlama/RaporListesi'
import RaporGecmisi from '@/components/Raporlama/RaporGecmisi'
import RaporPaylas from '@/components/Raporlama/RaporPaylas'
import RaporOlustur from '@/components/Raporlama/RaporOlustur'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { mockRaporlar } from '@/utils/mockData'

export default function RaporlamaPage() {
  const [raporlar, setRaporlar] = useState(mockRaporlar)
  const [filteredRaporlar, setFilteredRaporlar] = useState(mockRaporlar)
  const [activeTab, setActiveTab] = useState('current')
  const [showNewReportForm, setShowNewReportForm] = useState(false)

  const handleFilter = (filteredData) => {
    setFilteredRaporlar(filteredData)
  }

  const handleUpdateRapor = (updatedRapor) => {
    const updatedRaporlar = raporlar.map(rapor => 
      rapor.id === updatedRapor.id ? updatedRapor : rapor
    )
    setRaporlar(updatedRaporlar)
    setFilteredRaporlar(updatedRaporlar)
  }

  const handleCreateRapor = (newRapor) => {
    const updatedRaporlar = [...raporlar, { ...newRapor, id: Date.now() }]
    setRaporlar(updatedRaporlar)
    setFilteredRaporlar(updatedRaporlar)
    setShowNewReportForm(false)
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Raporlama</h1>
          <Button onClick={() => setShowNewReportForm(true)}>Yeni Rapor Oluştur</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="current">Mevcut Raporlar</TabsTrigger>
            <TabsTrigger value="history">Rapor Geçmişi</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <RaporAramaFiltre raporlar={raporlar} onFilter={handleFilter} />
            <RaporListesi raporlar={filteredRaporlar} onUpdateRapor={handleUpdateRapor} />
          </TabsContent>
          <TabsContent value="history">
            <RaporGecmisi raporlar={raporlar} />
          </TabsContent>
        </Tabs>
        <RaporPaylas />
        {showNewReportForm && (
          <RaporOlustur onClose={() => setShowNewReportForm(false)} onSubmit={handleCreateRapor} />
        )}
      </div>
    </BaroDashboard>
  )
}

