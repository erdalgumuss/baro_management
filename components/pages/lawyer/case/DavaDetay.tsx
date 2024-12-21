import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DavaSureci } from "./caseDetails/DavaSureci"
import { BelgeYonetimi } from "./caseDetails/BelgeYonetimi"
import { DurusmaTakvimi } from "./caseDetails/DurusmaTakvimi"
import { IletisimAlani } from "./caseDetails/IletisimAlani"

interface caseDetailsProps {
  dava: any
  isOpen: boolean
  onClose: () => void
}

export function caseDetails({ dava, isOpen, onClose }: caseDetailsProps) {
  const [activeTab, setActiveTab] = useState("ozet")

  if (!dava) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{dava.ad || 'Dava Detayı'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ozet">Özet</TabsTrigger>
              <TabsTrigger value="surec">Süreç</TabsTrigger>
              <TabsTrigger value="belgeler">Belgeler</TabsTrigger>
              <TabsTrigger value="durusmalar">Duruşmalar</TabsTrigger>
              <TabsTrigger value="iletisim">İletişim</TabsTrigger>
            </TabsList>
            <TabsContent value="ozet">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Dava Bilgileri</h3>
                  <div><strong>Dava No:</strong> {dava.numara || 'Belirtilmemiş'}</div>
                  <div>
                    <strong>Durum:</strong>{' '}
                    <Badge>{dava.durum || 'Belirtilmemiş'}</Badge>
                  </div>
                  <div><strong>Kategori:</strong> {dava.kategori || 'Belirtilmemiş'}</div>
                  <div><strong>Başarı Oranı:</strong> {dava.basariOrani ? `${dava.basariOrani}%` : 'Belirtilmemiş'}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Başvuran Bilgileri</h3>
                  <div><strong>Ad Soyad:</strong> {dava.basvuran || 'Belirtilmemiş'}</div>
                  <div><strong>İletişim:</strong> {dava.basvuranIletisim || 'Belirtilmemiş'}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Dava Özeti</h3>
                  <div>{dava.ozet || 'Dava özeti bulunmamaktadır.'}</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="surec">
              <DavaSureci dava={dava} />
            </TabsContent>
            <TabsContent value="belgeler">
              <BelgeYonetimi dava={dava} />
            </TabsContent>
            <TabsContent value="durusmalar">
              <DurusmaTakvimi dava={dava} />
            </TabsContent>
            <TabsContent value="iletisim">
              <IletisimAlani dava={dava} />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

