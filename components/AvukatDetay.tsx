'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AvukatDetay({ lawyer, onClose }) {
  if (!lawyer) return null

  const performanceData = [
    { name: 'Ocak', davaSayisi: 5, basariOrani: 80 },
    { name: 'Şubat', davaSayisi: 7, basariOrani: 85 },
    { name: 'Mart', davaSayisi: 6, basariOrani: 75 },
    { name: 'Nisan', davaSayisi: 8, basariOrani: 90 },
    { name: 'Mayıs', davaSayisi: 10, basariOrani: 88 },
    { name: 'Haziran', davaSayisi: 9, basariOrani: 92 },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Avukat Detayları</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="genel" className="w-full">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="genel" className="text-gray-100 data-[state=active]:bg-gray-600">Genel Bilgiler</TabsTrigger>
            <TabsTrigger value="performans" className="text-gray-100 data-[state=active]:bg-gray-600">Performans</TabsTrigger>
            <TabsTrigger value="davalar" className="text-gray-100 data-[state=active]:bg-gray-600">Davalar</TabsTrigger>
            <TabsTrigger value="egitim" className="text-gray-100 data-[state=active]:bg-gray-600">Eğitim ve Sertifikalar</TabsTrigger>
          </TabsList>
          <TabsContent value="genel">
            <Card className="bg-gray-700 text-gray-100">
              <CardHeader>
                <CardTitle>Genel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-600">
                      <TableCell className="font-medium text-gray-300">Ad Soyad</TableCell>
                      <TableCell className="text-gray-100">{lawyer.name}</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="font-medium text-gray-300">Uzmanlık Alanı</TableCell>
                      <TableCell className="text-gray-100">{lawyer.specialization}</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="font-medium text-gray-300">E-posta</TableCell>
                      <TableCell className="text-gray-100">{lawyer.email}</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="font-medium text-gray-300">Telefon</TableCell>
                      <TableCell className="text-gray-100">{lawyer.phone}</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-600">
                      <TableCell className="font-medium text-gray-300">Baro Sicil Numarası</TableCell>
                      <TableCell className="text-gray-100">{lawyer.barNumber}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performans">
            <Card className="bg-gray-700 text-gray-100">
              <CardHeader>
                <CardTitle>Performans Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="davaSayisi" fill="#8884d8" name="Dava Sayısı" />
                      <Bar yAxisId="right" dataKey="basariOrani" fill="#82ca9d" name="Başarı Oranı (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="davalar">
            <Card className="bg-gray-700 text-gray-100">
              <CardHeader>
                <CardTitle>Dava Listesi</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-600">
                      <TableHead className="text-gray-300">Dava No</TableHead>
                      <TableHead className="text-gray-300">Dava Türü</TableHead>
                      <TableHead className="text-gray-300">Durum</TableHead>
                      <TableHead className="text-gray-300">Başlangıç Tarihi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lawyer.cases && lawyer.cases.map((case_, index) => (
                      <TableRow key={index} className="border-gray-600">
                        <TableCell className="text-gray-100">{case_.caseNumber}</TableCell>
                        <TableCell className="text-gray-100">{case_.caseType}</TableCell>
                        <TableCell className="text-gray-100">{case_.status}</TableCell>
                        <TableCell className="text-gray-100">{case_.startDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="egitim">
            <Card className="bg-gray-700 text-gray-100">
              <CardHeader>
                <CardTitle>Eğitim ve Sertifikalar</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-600">
                      <TableHead className="text-gray-300">Eğitim/Sertifika Adı</TableHead>
                      <TableHead className="text-gray-300">Kurum</TableHead>
                      <TableHead className="text-gray-300">Tarih</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lawyer.education && lawyer.education.map((edu, index) => (
                      <TableRow key={index} className="border-gray-600">
                        <TableCell className="text-gray-100">{edu.name}</TableCell>
                        <TableCell className="text-gray-100">{edu.institution}</TableCell>
                        <TableCell className="text-gray-100">{edu.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

