import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface IletisimAlaniProps {
  dava: any
}

export function IletisimAlani({ dava }: IletisimAlaniProps) {
  const [yeniMesaj, setYeniMesaj] = useState('')

  const handleMesajGonder = () => {
    if (yeniMesaj.trim()) {
      console.log("Gönderilen mesaj:", yeniMesaj)
      setYeniMesaj('')
    }
  }

  const mesajlar = dava.mesajlar || []

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">İletişim</h3>
      <ScrollArea className="h-[300px] bg-gray-700 p-4 rounded">
        {mesajlar.length > 0 ? (
          mesajlar.map((mesaj: any, index: number) => (
            <div key={index} className={`mb-4 ${mesaj.gonderen === 'avukat' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded ${mesaj.gonderen === 'avukat' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <p className="font-medium">{mesaj.gonderen}</p>
                <p>{mesaj.icerik}</p>
                <p className="text-xs text-gray-400">{mesaj.tarih}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Henüz mesaj bulunmamaktadır.</p>
        )}
      </ScrollArea>
      <div className="flex space-x-2">
        <Textarea
          value={yeniMesaj}
          onChange={(e) => setYeniMesaj(e.target.value)}
          placeholder="Mesajınızı yazın..."
          className="bg-gray-700 text-gray-100"
        />
        <Button onClick={handleMesajGonder}>Gönder</Button>
      </div>
    </div>
  )
}

