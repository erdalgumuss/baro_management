'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DavaOzet from './DavaDetay/DavaOzet'
import DavaTaraflar from './DavaDetay/DavaTaraflar'
import DavaDurumu from './DavaDetay/DavaDurumu'
import AvukatYonetimi from './DavaDetay/AvukatYonetimi'
import DavaBelgeleri from './DavaDetay/DavaBelgeleri'
import HakIhlali from './DavaDetay/HakIhlali'
import DavaIletisim from './DavaDetay/DavaIletisim'
import DavaGecmisi from './DavaDetay/DavaGecmisi'
import DavaKapanis from './DavaDetay/DavaKapanis'
import DavaIstatistikleri from './DavaDetay/DavaIstatistikleri'

export default function DavaDetay({ dava, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('ozet')

  const handleUpdate = (updatedData) => {
    onUpdate({ ...dava, ...updatedData })
  }

  // Yeni eklenen davaların eksik özelliklerini kontrol et ve varsayılan değerler ata
  const normalizedDava = {
    durusmalar: [],
    belgeler: [],
    mesajlar: [],
    gecmis: [],
    ...dava
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100">Dava Detayları: {normalizedDava.davaNumarasi}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-700">
            <TabsTrigger value="ozet">Özet</TabsTrigger>
            <TabsTrigger value="taraflar">Taraflar</TabsTrigger>
            <TabsTrigger value="durum">Durum</TabsTrigger>
            <TabsTrigger value="belgeler">Belgeler</TabsTrigger>
            <TabsTrigger value="diger">Diğer</TabsTrigger>
          </TabsList>
          <TabsContent value="ozet">
            <DavaOzet dava={normalizedDava} onUpdate={handleUpdate} />
          </TabsContent>
          <TabsContent value="taraflar">
            <DavaTaraflar dava={normalizedDava} onUpdate={handleUpdate} />
          </TabsContent>
          <TabsContent value="durum">
            <DavaDurumu dava={normalizedDava} onUpdate={handleUpdate} />
          </TabsContent>
          <TabsContent value="belgeler">
            <DavaBelgeleri dava={normalizedDava} onUpdate={handleUpdate} />
          </TabsContent>
          <TabsContent value="diger">
            <Tabs defaultValue="avukat">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="avukat">Avukat</TabsTrigger>
                <TabsTrigger value="hakihlali">Hak İhlali</TabsTrigger>
                <TabsTrigger value="iletisim">İletişim</TabsTrigger>
                <TabsTrigger value="gecmis">Geçmiş</TabsTrigger>
                <TabsTrigger value="kapanis">Kapanış</TabsTrigger>
                <TabsTrigger value="istatistikler">İstatistikler</TabsTrigger>
              </TabsList>
              <TabsContent value="avukat">
                <AvukatYonetimi dava={normalizedDava} onUpdate={handleUpdate} />
              </TabsContent>
              <TabsContent value="hakihlali">
                <HakIhlali dava={normalizedDava} onUpdate={handleUpdate} />
              </TabsContent>
              <TabsContent value="iletisim">
                <DavaIletisim dava={normalizedDava} onUpdate={handleUpdate} />
              </TabsContent>
              <TabsContent value="gecmis">
                <DavaGecmisi dava={normalizedDava} onUpdate={handleUpdate} />
              </TabsContent>
              <TabsContent value="kapanis">
                <DavaKapanis dava={normalizedDava} onUpdate={handleUpdate} />
              </TabsContent>
              <TabsContent value="istatistikler">
                <DavaIstatistikleri dava={normalizedDava} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

