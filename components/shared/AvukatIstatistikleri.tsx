'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AvukatIstatistikleri({ lawyers }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  // Bu veriler normalde bir API'den alınacaktır. Şimdilik mock data kullanıyoruz.
  const statisticsData = [
    { month: 'Ocak', tamamlananDava: 4, yeniDava: 6 },
    { month: 'Şubat', tamamlananDava: 3, yeniDava: 4 },
    { month: 'Mart', tamamlananDava: 5, yeniDava: 7 },
    { month: 'Nisan', tamamlananDava: 6, yeniDava: 3 },
    { month: 'Mayıs', tamamlananDava: 4, yeniDava: 5 },
    { month: 'Haziran', tamamlananDava: 7, yeniDava: 8 },
  ]

  return (
    <div className="space-y-6">
      <Select onValueChange={(value) => setSelectedLawyer(lawyers.find(l => l.id.toString() === value))}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Avukat seçin" />
        </SelectTrigger>
        <SelectContent>
          {lawyers.map((lawyer) => (
            <SelectItem key={lawyer.id} value={lawyer.id.toString()}>{lawyer.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedLawyer && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Dava Sayısı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedLawyer.activeCases}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanan Davalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statisticsData.reduce((sum, data) => sum + data.tamamlananDava, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yeni Davalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statisticsData.reduce((sum, data) => sum + data.yeniDava, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((statisticsData.reduce((sum, data) => sum + data.tamamlananDava, 0) / 
                    (statisticsData.reduce((sum, data) => sum + data.tamamlananDava, 0) + selectedLawyer.activeCases)) * 100)}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aylık Dava İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statisticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tamamlananDava" fill="#8884d8" name="Tamamlanan Davalar" />
                    <Bar dataKey="yeniDava" fill="#82ca9d" name="Yeni Davalar" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

