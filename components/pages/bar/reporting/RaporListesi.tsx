import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RaporDetay from './RaporDetay'
import FileSaver from 'file-saver'

export default function RaporListesi({ raporlar, onUpdateRapor }) {
  const [selectedRapor, setSelectedRapor] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const handleUpdate = (e) => {
    e.preventDefault()
    onUpdateRapor(selectedRapor)
    setSelectedRapor(null)
  }

  const handleView = (rapor) => {
    setSelectedRapor(rapor)
    setIsViewDialogOpen(true)
  }

  const handleDownload = (rapor) => {
    // In a real application, this would generate a proper report file
    const reportContent = JSON.stringify(rapor, null, 2)
    const blob = new Blob([reportContent], { type: 'application/json' })
    FileSaver.saveAs(blob, `${rapor.baslik}.json`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {raporlar.map((rapor) => (
        <Card key={rapor.id} className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle>{rapor.baslik}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div><strong>Rapor Türü:</strong> {rapor.tur}</div>
              <div><strong>Zaman Aralığı:</strong> {rapor.zamanAraligi}</div>
              <div>
                <strong>Durum:</strong> <Badge>{rapor.durum}</Badge>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleView(rapor)}>Görüntüle</Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload(rapor)}>İndir</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedRapor(rapor)}>Güncelle</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
                    <DialogHeader>
                      <DialogTitle>Raporu Güncelle</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="baslik">Başlık</Label>
                        <Input
                          id="baslik"
                          value={selectedRapor?.baslik || ''}
                          onChange={(e) => setSelectedRapor({...selectedRapor, baslik: e.target.value})}
                          className="bg-gray-700 text-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="durum">Durum</Label>
                        <Input
                          id="durum"
                          value={selectedRapor?.durum || ''}
                          onChange={(e) => setSelectedRapor({...selectedRapor, durum: e.target.value})}
                          className="bg-gray-700 text-gray-100"
                        />
                      </div>
                      <Button type="submit">Güncelle</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Rapor Detayları</DialogTitle>
          </DialogHeader>
          {selectedRapor && <RaporDetay rapor={selectedRapor} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

