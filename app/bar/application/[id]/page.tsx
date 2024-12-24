'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BaroDashboard from '@/components/pages/bar/BaroDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationForm from '@/components/pages/bar/application/ApplicationForm';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import LawyerAssignment from '@/components/pages/bar/application/LawyerAssignment';
import { getApplicationById, updateApplication } from '@/services/applicationService'; // API çağrıları için servisler

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // id tipini doğrulama
  const [application, setApplication] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchApplication() {
      try {
        if (id) {
          const applicationData = await getApplicationById(id);
          setApplication(applicationData);
        }
      } catch (error) {
        toast({
          title: 'Hata',
          description: 'Başvuru verileri yüklenirken bir hata oluştu.',
        });
      }
    }
    fetchApplication();
  }, [id, toast]);

  const handleUpdateApplication = async (updatedApplication) => {
    try {
      const response = await updateApplication(application._id, updatedApplication);
      setApplication(response);
      setIsEditing(false);
      toast({
        title: 'Başvuru Güncellendi',
        description: 'Başvuru bilgileri başarıyla güncellendi.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Başvuru güncellenirken bir hata oluştu.',
      });
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedApplication = {
        ...application,
        messages: [
          ...(application.messages || []),
          { sender: 'Kullanıcı', message: newNote, date: new Date().toISOString() },
        ],
      };
      handleUpdateApplication(updatedApplication);
      setNewNote('');
    }
  };

  const handleAssignLawyer = (lawyer) => {
    const updatedApplication = {
      ...application,
      assignedLawyer: lawyer._id,
    };
    handleUpdateApplication(updatedApplication);
  };

  if (!application) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Başvuru Detayı</h1>
          <Badge variant={application.status === 'beklemede' ? 'default' : 'secondary'}>
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
                <strong>Başvuran Adı:</strong> {application.applicantName}
              </div>
              <div>
                <strong>E-posta:</strong> {application.contactDetails?.email || 'N/A'}
              </div>
              <div>
                <strong>Telefon:</strong> {application.contactDetails?.phone || 'N/A'}
              </div>
              <div>
                <strong>Başvuru Başlığı:</strong> {application.eventTitle}
              </div>
              <div>
                <strong>Başvuru Kategorisi:</strong> {application.eventCategory}
              </div>
              <div>
                <strong>Başvuru Tarihi:</strong>{' '}
                {new Date(application.date).toLocaleDateString() || 'N/A'}
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
            <TabsTrigger value="summary" className="text-gray-100 data-[state=active]:bg-gray-700">
              Özet
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-gray-100 data-[state=active]:bg-gray-700">
              Belgeler
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-gray-100 data-[state=active]:bg-gray-700">
              Zaman Çizelgesi
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-gray-100 data-[state=active]:bg-gray-700">
              Notlar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Açıklama</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{application.description || 'Açıklama bulunmamaktadır.'}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Belgeler</CardTitle>
              </CardHeader>
              <CardContent>
                {application.documents && application.documents.length > 0 ? (
                  application.documents.map((doc, index) => (
                    <div key={index} className="p-2">
                      <strong>{doc.name}</strong> ({doc.type}) -{' '}
                      {new Date(doc.date).toLocaleDateString()}
                    </div>
                  ))
                ) : (
                  <p>Henüz belge yüklenmemiş.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Zaman Çizelgesi</CardTitle>
              </CardHeader>
              <CardContent>
                {application.history && application.history.length > 0 ? (
                  application.history.map((entry, index) => (
                    <div key={index} className="p-2">
                      {new Date(entry.date).toLocaleDateString()} - {entry.action}:{' '}
                      {entry.description}
                    </div>
                  ))
                ) : (
                  <p>Zaman çizelgesi bulunmamaktadır.</p>
                )}
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
                  {application.messages && application.messages.length > 0 ? (
                    application.messages.map((message, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <p className="text-sm text-gray-400">
                          {new Date(message.date).toLocaleString()}
                        </p>
                        <p>{message.message}</p>
                      </div>
                    ))
                  ) : (
                    <p>Not bulunmamaktadır.</p>
                  )}
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
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className="bg-gray-700 text-gray-100"
            onClick={() => setIsEditing(true)}
          >
            Düzenle
          </Button>
        </div>

        {isEditing && (
          <ApplicationForm
            application={application}
            onClose={() => setIsEditing(false)}
            onSubmit={handleUpdateApplication}
          />
        )}
      </div>
    </BaroDashboard>
  );
}
