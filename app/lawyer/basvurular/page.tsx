'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'
import BasvuruListesi from '@/components/pages/lawyer/application/applicationList'
import DavaEkleForm from '@/components/pages/bar/case/DavaEkleForm'
import AvukatDashboard from '@/components/pages/lawyer/AvukatDashboard'
import { useRouter } from 'next/navigation'

// Mock data for demonstration purposes
const mockBasvurular = [
  { id: 1, basvuruNo: 'BSV001', basvuranAd: 'Ahmet Yılmaz', konu: 'İş Davası', tarih: '2023-06-01', durum: 'Yeni' },
  { id: 2, basvuruNo: 'BSV002', basvuranAd: 'Ayşe Kaya', konu: 'Boşanma Davası', tarih: '2023-06-02', durum: 'Onaylandı' },
  { id: 3, basvuruNo: 'BSV003', basvuranAd: 'Mehmet Demir', konu: 'Tazminat Davası', tarih: '2023-06-03', durum: 'Yeni' },
]

export default function BasvuruYonetimSayfasi() {
  const [basvurular, setBasvurular] = useState([])
  const [selectedBasvuru, setSelectedBasvuru] = useState(null)
  const [showDavaEkleForm, setShowDavaEkleForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulating API call to fetch basvurular
    setBasvurular(mockBasvurular)
  }, [])



  const handleBasvuruOnayla = (basvuruId) => {
    setBasvurular(basvurular.map(basvuru => 
      basvuru.id === basvuruId ? { ...basvuru, durum: 'Onaylandı' } : basvuru
    ))
    toast({
      title: "Başvuru Onaylandı",
      description: "Başvuru durumu 'Onaylandı' olarak güncellendi.",
    })
  }

  const handleDavaAc = (basvuruId) => {
    setSelectedBasvuru(basvurular.find(b => b.id === basvuruId))
    setShowDavaEkleForm(true)
  }
  const handleDavaSelect = (application) => {
    router.push(`/lawyer/basvurular/${application.id}`)
  }
  const handleDavaCreated = (yeniDava) => {
    setBasvurular(basvurular.map(basvuru => 
      basvuru.id === selectedBasvuru.id ? { ...basvuru, durum: 'Dava Açıldı' } : basvuru
    ))
    setShowDavaEkleForm(false)
    setSelectedBasvuru(null)
    toast({
      title: "Dava Oluşturuldu",
      description: "Başvuru durumu 'Dava Açıldı' olarak güncellendi.",
    })
  }

  return (
    <AvukatDashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Başvuru Yönetimi</h1>
        <BasvuruListesi 
          basvurular={basvurular} 
          onDavaSelect={handleDavaSelect}
          onBasvuruOnayla={handleBasvuruOnayla}
          onDavaAc={handleDavaAc}
        />

        {showDavaEkleForm && selectedBasvuru && (
          <DavaEkleForm
            isOpen={showDavaEkleForm}
            onClose={() => setShowDavaEkleForm(false)}
            onSubmit={handleDavaCreated}
            basvuru={selectedBasvuru}
          />
        )}
      </div>
    </AvukatDashboard>
  )
}