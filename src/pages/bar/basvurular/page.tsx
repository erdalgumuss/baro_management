'use client'

import { useState } from 'react'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import ApplicationSearchFilter from '@/components/pages/bar/application/ApplicationSearchFilter'
import ApplicationList from '@/components/pages/bar/application//ApplicationList'
import ApplicationStatistics from '@/components/pages/bar/application//ApplicationStatistics'
import ApplicationForm from '@/components/pages/bar/application//ApplicationForm'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockApplications } from '@/utils/mockData'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [filteredApplications, setFilteredApplications] = useState(mockApplications)
  const [activeTab, setActiveTab] = useState('list')
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  

  const handleNewApplication = (newApplication) => {
    const newId = Date.now().toString() // ID'yi string olarak oluştur
    const updatedApplications = [...applications, { ...newApplication, id: newId }]
    setApplications(updatedApplications)
    setFilteredApplications(updatedApplications)
    setShowNewApplicationForm(false)
    toast({
      title: "Başvuru Eklendi",
      description: "Yeni başvuru başarıyla eklendi.",
    })
  }

  const handleUpdateApplication = (updatedApplication) => {
    const updatedApplications = applications.map(app => 
      app.id === updatedApplication.id ? updatedApplication : app
    )
    setApplications(updatedApplications)
    setFilteredApplications(updatedApplications)
    toast({
      title: "Başvuru Güncellendi",
      description: "Başvuru bilgileri başarıyla güncellendi.",
    })
  }

  const handleDavaSelect = (application) => {
    router.push(`/dashboard/basvurular/${application.id}`)
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Başvuru Yönetimi</h1>
          <Button 
            onClick={() => setShowNewApplicationForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Yeni Başvuru Ekle
          </Button>
        </div>

        <ApplicationSearchFilter applications={applications} onFilter={setFilteredApplications} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Başvuru Listesi</TabsTrigger>
            <TabsTrigger value="statistics">İstatistikler</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <ApplicationList 
              applications={filteredApplications}
              onUpdateApplication={handleUpdateApplication}
              onDavaSelect={handleDavaSelect}
            />
          </TabsContent>
          <TabsContent value="statistics">
            <ApplicationStatistics applications={applications} />
          </TabsContent>
        </Tabs>

        {showNewApplicationForm && (
          <ApplicationForm
            onClose={() => setShowNewApplicationForm(false)}
            onSubmit={handleNewApplication} application={undefined}          />
        )}
      </div>
    </BaroDashboard>
  )
}

