'use client'

import { useState } from 'react'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import AvukatList from '@/components/pages/bar/lawyerManagement/AvukatList'
import AvukatForm from '@/components/pages/bar/lawyerManagement/AvukatForm'
import AvukatDetay from '@/components/pages/bar/lawyerManagement/AvukatDetay'
import AvukatPerformans from '@/components/pages/bar/lawyerManagement/AvukatPerformans'
import AvukatAramaFiltre from '@/components/pages/bar/lawyerManagement/AvukatAramaFiltre'
import AvukatTakvim from '@/components/pages/bar/lawyerManagement/AvukatTakvim'
import AvukatKategorileri from '@/components/pages/bar/lawyerManagement/AvukatKategorileri'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockLawyers } from '@/utils/mockData'

export default function AvukatYonetimiPage() {
  const [lawyers] = useState(mockLawyers)
  const [filteredLawyers, setFilteredLawyers] = useState(mockLawyers)
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [showNewLawyerForm, setShowNewLawyerForm] = useState(false)
  const [viewingLawyer, setViewingLawyer] = useState(null)





 

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
            <AvukatKategorileri lawyers={filteredLawyers} />
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

