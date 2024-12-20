'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BaroDashboard from '@/components/BaroDashboard'
import RaporBaslikOzet from '@/components/Raporlama/RaporDetay/RaporBaslikOzet'
import RaporTurKapsam from '@/components/Raporlama/RaporDetay/RaporTurKapsam'
import GrafikIstatistikler from '@/components/Raporlama/RaporDetay/GrafikIstatistikler'
import DetayliVeriTablosu from '@/components/Raporlama/RaporDetay/DetayliVeriTablosu'
import OngoreselAnalizTrendler from '@/components/Raporlama/RaporDetay/OngoreselAnalizTrendler'
import RaporSonucYorumlar from '@/components/Raporlama/RaporDetay/RaporSonucYorumlar'
import { mockRaporlar } from '@/utils/mockData'

export default function RaporDetayPage() {
  const { id } = useParams()
  const [rapor, setRapor] = useState(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const selectedRapor = mockRaporlar.find(r => r.id.toString() === id)
    setRapor(selectedRapor)
  }, [id])

  if (!rapor) {
    return <div>Yükleniyor...</div>
  }

  return (
    <BaroDashboard>
      <div className="space-y-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <RaporBaslikOzet rapor={rapor} />
        <RaporTurKapsam rapor={rapor} />
        <GrafikIstatistikler rapor={rapor} />
        <DetayliVeriTablosu rapor={rapor} />
        <OngoreselAnalizTrendler rapor={rapor} />
        <RaporSonucYorumlar rapor={rapor} />
      </div>
    </BaroDashboard>
  )
}

