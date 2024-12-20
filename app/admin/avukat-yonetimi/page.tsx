'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/BaroDashboard'
import AvukatList from '@/components/AvukatList'
import AvukatForm from '@/components/AvukatForm'
import AvukatDetay from '@/components/AvukatDetay'
import AvukatPerformans from '@/components/AvukatPerformans'
import AvukatAramaFiltre from '@/components/AvukatAramaFiltre'
import AvukatTakvim from '@/components/AvukatTakvim'
import AvukatKategorileri from '@/components/AvukatKategorileri'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockLawyers } from '@/utils/mockData'

export default function AvukatYonetimiPage() {
  const [lawyers, setLawyers] = useState(mockLawyers)
  const [filteredLawyers, setFilteredLawyers] = useState(mockLawyers)
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [showNewLawyerForm, setShowNewLawyerForm] = useState(false)
  const [viewingLawyer, setViewingLawyer] = useState(null)

  const handleNewLawyer = (newLawyer) => {
    setLawyers([...lawyers, { ...newLawyer, id: Date.now(), cases: [] }])
    setShowNewLawyerForm(false)
  }

  const handleUpdateLawyer = (updatedLawyer) => {
    setLawyers(lawyers.map(lawyer => lawyer.id === updatedLawyer.id ? updatedLawyer : lawyer))
    setSelectedLawyer(null)
  }

  const handleDeleteLawyer = (lawyerId) => {
    setLawyers(lawyers.filter(lawyer => lawyer.id !== lawyerId))
    setSelectedLawyer(null)
  }

  const handleViewDetails = (lawyer) => {
    setViewingLawyer(lawyer)
  }

  const handleFilter = (filteredData) => {
    setFilteredLawyers(filteredData)
  }

  return (
    <BaroDashboard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-100">Avukat Yönetimi</h1>
          <Button onClick={() => setShowNewLawyerForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
            Yeni Avukat Ekle
          </Button>
        </div>

        <AvukatAramaFiltre lawyers={lawyers} onFilter={handleFilter} />

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="list" className="text-gray-100 data-[state=active]:bg-gray-700">Avukat Listesi</TabsTrigger>
            <TabsTrigger value="performance" className="text-gray-100 data-[state=active]:bg-gray-700">Performans Raporları</TabsTrigger>
            <TabsTrigger value="calendar" className="text-gray-100 data-[state=active]:bg-gray-700">Takvim</TabsTrigger>
            <TabsTrigger value="categories" className="text-gray-100 data-[state=active]:bg-gray-700">Kategoriler</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <AvukatList
              lawyers={filteredLawyers}
              onSelectLawyer={setSelectedLawyer}
              onDeleteLawyer={handleDeleteLawyer}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="performance">
            <AvukatPerformans lawyers={filteredLawyers} />
          </TabsContent>
          <TabsContent value="calendar">
            <AvukatTakvim lawyers={filteredLawyers} />
          </TabsContent>
          <TabsContent value="categories">
            <AvukatKategorileri lawyers={filteredLawyers} onUpdateLawyer={handleUpdateLawyer} />
          </TabsContent>
        </Tabs>

        {showNewLawyerForm && (
          <AvukatForm
            onClose={() => setShowNewLawyerForm(false)}
            onSubmit={handleNewLawyer}
          />
        )}

        {selectedLawyer && (
          <AvukatForm
            lawyer={selectedLawyer}
            onClose={() => setSelectedLawyer(null)}
            onSubmit={handleUpdateLawyer}
          />
        )}

        {viewingLawyer && (
          <AvukatDetay
            lawyer={viewingLawyer}
            onClose={() => setViewingLawyer(null)}
          />
        )}
      </div>
    </BaroDashboard>
  )
}

