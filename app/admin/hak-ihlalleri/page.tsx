'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/BaroDashboard'
import HakIhlaliAramaFiltre from '@/components/HakIhlali/HakIhlaliAramaFiltre'
import HakIhlaliListesi from '@/components/HakIhlali/HakIhlaliListesi'
import HakIhlaliDetay from '@/components/HakIhlali/HakIhlaliDetay'
import HakIhlaliKategoriIzleme from '@/components/HakIhlali/HakIhlaliKategoriIzleme'
import HakIhlaliKaynakEntegrasyonu from '@/components/HakIhlali/HakIhlaliKaynakEntegrasyonu'
import HakIhlaliSonuclandirma from '@/components/HakIhlali/HakIhlaliSonuclandirma'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockHakIhlalleri } from '@/utils/mockData'

export default function HakIhlaliYonetimPage() {
  const [hakIhlalleri, setHakIhlalleri] = useState(mockHakIhlalleri)
  const [filteredHakIhlalleri, setFilteredHakIhlalleri] = useState(mockHakIhlalleri)
  const [selectedHakIhlali, setSelectedHakIhlali] = useState(null)
  const [activeTab, setActiveTab] = useState('liste')

  useEffect(() => {
    // Simulating API call to fetch data
    setHakIhlalleri(mockHakIhlalleri)
    setFilteredHakIhlalleri(mockHakIhlalleri)
  }, [])

  const handleFilter = (filteredIhlaller) => {
    setFilteredHakIhlalleri(filteredIhlaller)
  }

  const handleHakIhlaliSelect = (ihlal) => {
    setSelectedHakIhlali(ihlal)
  }

  const handleHakIhlaliUpdate = (updatedIhlal) => {
    const updatedIhlaller = hakIhlalleri.map(ihlal => 
      ihlal.id === updatedIhlal.id ? updatedIhlal : ihlal
    )
    setHakIhlalleri(updatedIhlaller)
    setFilteredHakIhlalleri(updatedIhlaller)
    setSelectedHakIhlali(null)
  }

  const handleYeniHakIhlali = () => {
    const yeniIhlal = {
      id: Date.now(),
      vakaBasligi: "Yeni Hak İhlali",
      basvuranKisi: "",
      kategori: "",
      kaynak: "",
      durum: "İşlemde",
      basvuruTarihi: new Date().toISOString().split('T')[0],
      detaylar: "",
      olayOzeti: "",
      basvuranAdi: "",
      basvuranIletisim: "",
      basvuruMetni: "",
      hukukiTemsilci: "",
      olayBildirenKurum: "",
      kaynakDetay: "",
      gelismeler: [],
      sonuc: "",
      dosyalar: [],
      mesajlar: []
    }
    setHakIhlalleri([...hakIhlalleri, yeniIhlal])
    setFilteredHakIhlalleri([...filteredHakIhlalleri, yeniIhlal])
    setSelectedHakIhlali(yeniIhlal)
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hak İhlali Yönetimi</h1>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleYeniHakIhlali}
          >
            Yeni Hak İhlali Bildirimi
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="liste">Hak İhlalleri Listesi</TabsTrigger>
            <TabsTrigger value="kategori">Kategori İzleme</TabsTrigger>
            <TabsTrigger value="kaynaklar">Kaynak Entegrasyonu</TabsTrigger>
            <TabsTrigger value="sonuclandirma">Sonuçlandırma</TabsTrigger>
          </TabsList>

          <TabsContent value="liste">
            <HakIhlaliAramaFiltre hakIhlalleri={hakIhlalleri} onFilter={handleFilter} />
            <HakIhlaliListesi 
              hakIhlalleri={filteredHakIhlalleri} 
              onHakIhlaliSelect={handleHakIhlaliSelect}
            />
          </TabsContent>

          <TabsContent value="kategori">
            <HakIhlaliKategoriIzleme hakIhlalleri={hakIhlalleri} />
          </TabsContent>

          <TabsContent value="kaynaklar">
            <HakIhlaliKaynakEntegrasyonu onYeniIhlal={handleYeniHakIhlali} />
          </TabsContent>

          <TabsContent value="sonuclandirma">
            <HakIhlaliSonuclandirma hakIhlalleri={hakIhlalleri} onUpdate={handleHakIhlaliUpdate} />
          </TabsContent>
        </Tabs>

        {selectedHakIhlali && (
          <HakIhlaliDetay
            hakIhlali={selectedHakIhlali}
            onClose={() => setSelectedHakIhlali(null)}
            onUpdate={handleHakIhlaliUpdate}
          />
        )}
      </div>
    </BaroDashboard>
  )
}

