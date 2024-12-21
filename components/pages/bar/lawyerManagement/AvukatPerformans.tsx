'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import FileSaver from 'file-saver'

export default function AvukatPerformans({ lawyers }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  // Bu veriler normalde bir API'den alınacaktır. Şimdilik mock data kullanıyoruz.
  const performanceData = {
    totalCompletedCases: 25,
    ongoingCases: 8,
    averageCompletionTime: '45 gün',
    successRate: '80%',
    caseTypes: [
      { type: 'Ceza Davası', completed: 10, ongoing: 3 },
      { type: 'Hukuk Davası', completed: 8, ongoing: 2 },
      { type: 'İdari Dava', completed: 7, ongoing: 3 },
    ]
  }

  const monthlyPerformance = [
    { month: 'Ocak', completedCases: 5, successRate: 80, averageTime: 40 },
    { month: 'Şubat', completedCases: 7, successRate: 85, averageTime: 38 },
    { month: 'Mart', completedCases: 6, successRate: 75, averageTime: 42 },
    { month: 'Nisan', completedCases: 8, successRate: 90, averageTime: 35 },
    { month: 'Mayıs', completedCases: 10, successRate: 88, averageTime: 37 },
    { month: 'Haziran', completedCases: 9, successRate: 92, averageTime: 33 },
  ]

  const handleShareReport = () => {
    // Bu fonksiyon normalde bir API çağrısı yaparak raporu e-posta ile gönderecektir.
    console.log('Rapor e-posta ile paylaşıldı')
  }

  const handleDownloadReport = () => {
    const reportContent = JSON.stringify({
      lawyer: selectedLawyer,
      performanceData,
      monthlyPerformance
    }, null, 2)
    const blob = new Blob([reportContent], { type: 'application/json' })
    FileSaver.saveAs(blob, `${selectedLawyer.name}_performans_raporu.json`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="lawyer-select" className="block text-sm font-medium text-gray-200">
          Avukat Seç
        </label>
        <Select onValueChange={(value) => setSelectedLawyer(lawyers.find(l => l.id.toString() === value))}>
          <SelectTrigger id="lawyer-select" className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Avukat seçin" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            {lawyers.map((lawyer) => (
              <SelectItem key={lawyer.id} value={lawyer.id.toString()}>{lawyer.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedLawyer && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-800 text-gray-100 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Tamamlanan Davalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.totalCompletedCases}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 text-gray-100 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devam Eden Davalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.ongoingCases}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 text-gray-100 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Tamamlanma Süresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.averageCompletionTime}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 text-gray-100 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.successRate}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Aylık Performans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="completedCases" stroke="#8884d8" name="Tamamlanan Davalar" />
                    <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#82ca9d" name="Başarı Oranı (%)" />
                    <Line yAxisId="left" type="monotone" dataKey="averageTime" stroke="#ffc658" name="Ortalama Süre (gün)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Dava Türlerine Göre Performans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData.caseTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#8884d8" name="Tamamlanan" />
                    <Bar dataKey="ongoing" fill="#82ca9d" name="Devam Eden" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button onClick={handleShareReport} className="bg-blue-600 hover:bg-blue-700 text-white">
              Raporu Paylaş
            </Button>
            <Button onClick={handleDownloadReport} className="bg-green-600 hover:bg-green-700 text-white">
              Raporu İndir
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

