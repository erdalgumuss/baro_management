'use client'

import { useState } from 'react'
import AvukatDashboard from '@/components/AvukatDashboard'
import { DavaAramaFiltre } from '@/components/avukat/DavaAramaFiltre'
import { DavaListesi } from '@/components/avukat/DavaListesi'
import { DavaDetay } from '@/components/avukat/DavaDetay'

// Mock data
const mockDavalar = [
  {
    id: '1',
    ad: 'Yılmaz vs. ABC Şirketi',
    numara: 'DVA2023001',
    durum: 'aktif',
    basvuran: 'Ahmet Yılmaz',
    avukat: 'Av. Mehmet Öz',
    konu: 'İş Hukuku - Haksız Fesih',
    basariOrani: 75,
    kategori: 'is',
    basvuranIletisim: 'ahmet@email.com | 0555-123-4567',
    ozet: 'ABC Şirketi tarafından haksız yere işten çıkarılan Ahmet Yılmaz\'ın açtığı dava.',
    dosyalar: ['İş Sözleşmesi.pdf', 'Fesih Bildirimi.pdf', 'Tanık İfadeleri.docx']
  },
  {
    id: '2',
    ad: 'Kaya Ailesi Veraset Davası',
    numara: 'DVA2023002',
    durum: 'beklemede',
    basvuran: 'Ayşe Kaya',
    avukat: 'Av. Mehmet Öz',
    konu: 'Miras Hukuku - Veraset İlamı',
    basariOrani: 60,
    kategori: 'aile',
    basvuranIletisim: 'ayse@email.com | 0555-987-6543',
    ozet: 'Kaya ailesinin miras paylaşımı konusundaki anlaşmazlığı üzerine açılan dava.',
    dosyalar: ['Veraset İlamı.pdf', 'Tapu Kayıtları.pdf', 'Aile Nüfus Kayıt Örneği.pdf']
  },
  // Daha fazla mock dava eklenebilir
]

export default function DavalarPage() {
  const [davalar, setDavalar] = useState(mockDavalar)
  const [selectedDava, setSelectedDava] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleFilter = (filteredDavalar) => {
    setDavalar(filteredDavalar)
  }

  const handleDetayGor = (id) => {
    const dava = davalar.find(d => d.id === id)
    setSelectedDava(dava)
    setIsDetailOpen(true)
  }

  return (
    <AvukatDashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Atanmış Davalar</h1>
        <DavaAramaFiltre onFilter={handleFilter} davalar={mockDavalar} />
        <DavaListesi davalar={davalar} onDetayGor={handleDetayGor} />
        <DavaDetay 
          dava={selectedDava} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      </div>
    </AvukatDashboard>
  )
}

