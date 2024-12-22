'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import ApplicationSearchFilter from '@/components/pages/bar/application/ApplicationSearchFilter'
import ApplicationList from '@/components/pages/bar/application/ApplicationList'
import ApplicationStatistics from '@/components/pages/bar/application/ApplicationStatistics'
import ApplicationForm from '@/components/pages/bar/application/ApplicationForm'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [activeTab, setActiveTab] = useState('list')
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Verileri backend'den çekmek için API çağrısı
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications ', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Eğer gerekliyse token ekleyin
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })

        if (!response.ok) {
          throw new Error('Başvurular alınamadı')
        }

        const data = await response.json()
        setApplications(data)
        setFilteredApplications(data)
      } catch (error) {
        console.error('Veri çekme hatası:', error)
        toast({
          title: 'Hata',
          description: 'Başvurular alınırken bir hata oluştu.',
          variant: 'destructive',
        })
      }
    }

    fetchApplications()
  }, [])

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
    router.push(`/bar/application/${application.id}`)
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
            onSubmit={handleNewApplication}
          />
        )}
      </div>
    </BaroDashboard>
  )
}
