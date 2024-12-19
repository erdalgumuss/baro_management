import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RaporOlustur({ onClose, onSubmit }) {
  const [newRapor, setNewRapor] = useState({
    baslik: '',
    tur: '',
    zamanAraligi: '',
    durum: 'Hazırlanıyor',
    tarih: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(newRapor)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Yeni Rapor Oluştur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="baslik">Başlık</Label>
            <Input
              id="baslik"
              value={newRapor.baslik}
              onChange={(e) => setNewRapor({...newRapor, baslik: e.target.value})}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div>
            <Label htmlFor="tur">Rapor Türü</Label>
            <Select value={newRapor.tur} onValueChange={(value) => setNewRapor({...newRapor, tur: value})}>
              <SelectTrigger id="tur" className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Rapor türü seçin" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="dava">Dava Raporu</SelectItem>
                <SelectItem value="hakIhlali">Hak İhlali Raporu</SelectItem>
                <SelectItem value="avukatPerformans">Avukat Performans Raporu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="zamanAraligi">Zaman Aralığı</Label>
            <Select value={newRapor.zamanAraligi} onValueChange={(value) => setNewRapor({...newRapor, zamanAraligi: value})}>
              <SelectTrigger id="zamanAraligi" className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Zaman aralığı seçin" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="Günlük">Günlük</SelectItem>
                <SelectItem value="Haftalık">Haftalık</SelectItem>
                <SelectItem value="Aylık">Aylık</SelectItem>
                <SelectItem value="Yıllık">Yıllık</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Rapor Oluştur</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

