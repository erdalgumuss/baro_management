import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DurusmaTakvimiProps {
  dava: any
}

export function DurusmaTakvimi({ dava }: DurusmaTakvimiProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [yeniDurusma, setYeniDurusma] = useState({ tarih: '', saat: '' })

  const handleDurusmaEkle = () => {
    console.log("Yeni duruşma:", yeniDurusma)
    setYeniDurusma({ tarih: '', saat: '' })
  }

  const durusmalar = dava.durusmalar || []

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Duruşma Takvimi</h3>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border bg-gray-700 text-gray-100"
          />
        </div>
        <div className="w-1/2 space-y-4">
          <div>
            <h4 className="font-medium">Yeni Duruşma Ekle</h4>
            <div className="flex space-x-2 mt-2">
              <Input
                type="date"
                value={yeniDurusma.tarih}
                onChange={(e) => setYeniDurusma({ ...yeniDurusma, tarih: e.target.value })}
                className="bg-gray-700 text-gray-100"
              />
              <Input
                type="time"
                value={yeniDurusma.saat}
                onChange={(e) => setYeniDurusma({ ...yeniDurusma, saat: e.target.value })}
                className="bg-gray-700 text-gray-100"
              />
              <Button onClick={handleDurusmaEkle}>Ekle</Button>
            </div>
          </div>
          <div>
            <h4 className="font-medium">Yaklaşan Duruşmalar</h4>
            {durusmalar.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {durusmalar.map((durusma: any, index: number) => (
                  <li key={index} className="bg-gray-700 p-2 rounded">
                    <p>{durusma.tarih} - {durusma.saat}</p>
                    <p className="text-sm text-gray-400">{durusma.aciklama}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Yaklaşan duruşma bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

