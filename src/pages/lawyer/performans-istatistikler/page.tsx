'use client'

import { useState } from 'react'
import AvukatDashboard from '@/components/pages/lawyer/AvukatDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function PerformansIstatistiklerPage() {
  const [timeRange, setTimeRange] = useState('monthly')

  // Mock data - replace with real data from your backend
  const successRateData = [
    { name: 'Kazanılan', value: 75 },
    { name: 'Kaybedilen', value: 25 },
  ]

  const caseTypeSuccessData = [
    { name: 'Aile', kazanilan: 80, kaybedilen: 20 },
    { name: 'Ticaret', kazanilan: 65, kaybedilen: 35 },
    { name: 'Ceza', kazanilan: 70, kaybedilen: 30 },
  ]

  const timeBasedPerformanceData = [
    { name: 'Ocak', davaSayisi: 10, basariOrani: 70 },
    { name: 'Şubat', davaSayisi: 15, basariOrani: 80 },
    { name: 'Mart', davaSayisi: 12, basariOrani: 75 },
    // ... more months
  ]

  const caseLoadData = {
    toplamAktifDava: 45,
    tamamlananDava: 30,
    ortalamaDavaSuresi: '6 ay',
    genelBasariOrani: '75%'
  }

  const performanceComparisonData = [
    { name: 'Siz', score: 75 },
    { name: 'Ortalama', score: 65 },
  ]

  return (
    <AvukatDashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Performans ve İstatistikler</h1>
        
        <Tabs defaultValue="success-rate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="success-rate">Başarı Oranı</TabsTrigger>
            <TabsTrigger value="case-type">Dava Tipine Göre Başarı</TabsTrigger>
            <TabsTrigger value="time-based">Zaman Bazlı Performans</TabsTrigger>
            <TabsTrigger value="case-load">Dava Yükü</TabsTrigger>
            <TabsTrigger value="comparison">Kıyaslama</TabsTrigger>
          </TabsList>

          <TabsContent value="success-rate">
            <Card>
              <CardHeader>
                <CardTitle>Genel Başarı Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={successRateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {successRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="case-type">
            <Card>
              <CardHeader>
                <CardTitle>Dava Tipine Göre Başarı Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={caseTypeSuccessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="kazanilan" fill="#82ca9d" name="Kazanılan" />
                      <Bar dataKey="kaybedilen" fill="#8884d8" name="Kaybedilen" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time-based">
            <Card>
              <CardHeader>
                <CardTitle>Zaman Bazlı Performans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="border rounded p-2"
                    >
                      <option value="monthly">Aylık</option>
                      <option value="yearly">Yıllık</option>
                    </select>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeBasedPerformanceData}>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="case-load">
            <Card>
              <CardHeader>
                <CardTitle>Toplam Dava Yükü</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Toplam Aktif Dava</h3>
                    <p className="text-2xl">{caseLoadData.toplamAktifDava}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tamamlanan Dava</h3>
                    <p className="text-2xl">{caseLoadData.tamamlananDava}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ortalama Dava Süresi</h3>
                    <p className="text-2xl">{caseLoadData.ortalamaDavaSuresi}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Genel Başarı Oranı</h3>
                    <p className="text-2xl">{caseLoadData.genelBasariOrani}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Performans Kıyaslama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" name="Performans Skoru" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AvukatDashboard>
  )
}

