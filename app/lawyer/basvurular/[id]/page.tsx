'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockApplications } from '@/utils/mockData'
import ApplicationForm from '@/components/pages/bar/application/ApplicationForm'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"
import LawyerAssignment from '@/components/pages/bar/application/LawyerAssignment'

export default function ApplicationDetailPage() {
  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newNote, setNewNote] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // In a real application, this would be an API call
    const foundApplication = mockApplications.find(app => app.id === id)
    setApplication(foundApplication)
  }, [id])

  const handleUpdateApplication = (updatedApplication) => {
    setApplication(updatedApplication)
    setIsEditing(false)
    toast({
      title: "Başvuru Güncellendi",
      description: "Başvuru bilgileri başarıyla güncellendi.",
    })
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedApplication = {
        ...application,
        notes: [...(application.notes || []), { text: newNote, date: new Date().toISOString() }]
      }
      setApplication(updatedApplication)
      setNewNote('')
      toast({
        title: "Not Eklendi",
        description: "Yeni not başarıyla eklendi.",
      })
    }
  }

  const handleAssignLawyer = (lawyer) => {
    const updatedApplication = {
      ...application,
      assignedLawyer: lawyer.name
    }
    setApplication(updatedApplication)
    toast({
      title: "Avukat Atandı",
      description: `${lawyer.name} başvuruya atandı.`,
    })
  }

  const handleUpdate = () => {
    // In a real application, this would be an API call
    toast({
      title: "Başvuru Güncellendi",
      description: "Başvuru bilgileri başarıyla güncellendi.",
    })
  }

  if (!application) {
    return <div>Yükleniyor...</div>
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Başvuru Detayı</h1>
          <Badge variant={application.status === 'active' ? 'default' : 'secondary'}>
            {application.status}
          </Badge>
        </div>

        <Card className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle>Başvuru Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Başvuru No:</strong> {application.applicationNumber}
              </div>
              <div>
                <strong>Başvuran:</strong> {application.applicantName}
              </div>
              <div>
                <strong>Dava Konusu:</strong> {application.caseSubject}
              </div>
              <div>
                <strong>Başvuru Tarihi:</strong> {application.applicationDate}
              </div>
              <div className="col-span-2">
                <strong>Atanan Avukat:</strong> {application.assignedLawyer || 'Atanmadı'}
                {!application.assignedLawyer && (
                  <div className="mt-2">
                    <LawyerAssignment onAssign={handleAssignLawyer} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="summary" className="text-gray-100 data-[state=active]:bg-gray-700">Özet</TabsTrigger>
            <TabsTrigger value="documents" className="text-gray-100 data-[state=active]:bg-gray-700">Belgeler</TabsTrigger>
            <TabsTrigger value="timeline" className="text-gray-100 data-[state=active]:bg-gray-700">Zaman Çizelgesi</TabsTrigger>
            <TabsTrigger value="notes" className="text-gray-100 data-[state=active]:bg-gray-700">Notlar</TabsTrigger>
            <TabsTrigger value="communication" className="text-gray-100 data-[state=active]:bg-gray-700">İletişim</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Başvuru Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{application.summary}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Belgeler</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Henüz belge yüklenmemiş.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Zaman Çizelgesi</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Zaman çizelgesi henüz oluşturulmadı.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Notlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.notes && application.notes.map((note, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-400">{new Date(note.date).toLocaleString()}</p>
                      <p>{note.text}</p>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Yeni not ekle..."
                      className="bg-gray-700 text-gray-100"
                    />
                    <Button onClick={handleAddNote}>Not Ekle</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="communication">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>İletişim</CardTitle>
              </CardHeader>
              <CardContent>
                <p>İletişim modülü henüz eklenmedi.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      

        {isEditing && (
          <ApplicationForm
            application={application}
            onClose={() => setIsEditing(false)}
            onSubmit={handleUpdateApplication}
          />
        )}
      </div>
    </BaroDashboard>
  )
}