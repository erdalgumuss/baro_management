import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Belge {
  id: string
  ad: string
  tur: string
  yuklemeTarihi: string
  yukleyenKisi: string
  durum: 'incelenmedi' | 'onaylandi' | 'reddedildi'
}

interface BelgeYonetimiProps {
  dava: any
}

export function BelgeYonetimi({ dava }: BelgeYonetimiProps) {
  const [belgeler, setBelgeler] = useState<Belge[]>(dava.belgeler || [])
  const [yeniBelge, setYeniBelge] = useState<File | null>(null)
  const [belgeTuru, setBelgeTuru] = useState('')
  const [goruntulenecekBelge, setGoruntulenecekBelge] = useState<Belge | null>(null)

  const handleBelgeYukle = () => {
    if (yeniBelge && belgeTuru) {
      const yeniBelgeObj: Belge = {
        id: Date.now().toString(),
        ad: yeniBelge.name,
        tur: belgeTuru,
        yuklemeTarihi: new Date().toLocaleString(),
        yukleyenKisi: 'Avukat',
        durum: 'incelenmedi'
      }
      setBelgeler([...belgeler, yeniBelgeObj])
      setYeniBelge(null)
      setBelgeTuru('')
    }
  }

  const handleDurumDegistir = (belgeId: string, yeniDurum: 'incelenmedi' | 'onaylandi' | 'reddedildi') => {
    setBelgeler(belgeler.map(belge => 
      belge.id === belgeId ? { ...belge, durum: yeniDurum } : belge
    ))
  }

  const durumRenkleri = {
    incelenmedi: 'bg-yellow-500',
    onaylandi: 'bg-green-500',
    reddedildi: 'bg-red-500'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Belgeler</h3>
      <div className="flex items-center space-x-2">
        <Input 
          type="file" 
          onChange={(e) => setYeniBelge(e.target.files?.[0] || null)}
          className="bg-gray-700 text-gray-100"
        />
        <Select value={belgeTuru} onValueChange={setBelgeTuru}>
          <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100">
            <SelectValue placeholder="Belge türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="durusma_tutanagi">Duruşma Tutanağı</SelectItem>
            <SelectItem value="delil">Delil</SelectItem>
            <SelectItem value="karar_metni">Karar Metni</SelectItem>
            <SelectItem value="diger">Diğer</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleBelgeYukle} disabled={!yeniBelge || !belgeTuru}>Yükle</Button>
      </div>
      {belgeler.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Belge Adı</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Yükleme Tarihi</TableHead>
              <TableHead>Yükleyen</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {belgeler.map((belge) => (
              <TableRow key={belge.id}>
                <TableCell>{belge.ad}</TableCell>
                <TableCell>{belge.tur}</TableCell>
                <TableCell>{belge.yuklemeTarihi}</TableCell>
                <TableCell>{belge.yukleyenKisi}</TableCell>
                <TableCell>
                  <Badge className={durumRenkleri[belge.durum]}>{belge.durum}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setGoruntulenecekBelge(belge)}>
                          Görüntüle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>{belge.ad}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p>Belge içeriği burada gösterilecek.</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">İndir</Button>
                    <Select 
                      value={belge.durum} 
                      onValueChange={(value: 'incelenmedi' | 'onaylandi' | 'reddedildi') => handleDurumDegistir(belge.id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Durum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incelenmedi">İncelenmedi</SelectItem>
                        <SelectItem value="onaylandi">Onaylandı</SelectItem>
                        <SelectItem value="reddedildi">Reddedildi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Bu dava için henüz belge bulunmamaktadır.</p>
      )}
    </div>
  )
}

