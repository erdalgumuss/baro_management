'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import RaporBaslikOzet from '@/components/pages/bar/reporting/reportingDetails/RaporBaslikOzet'
import RaporTurKapsam from '@/components/pages/bar/reporting/reportingDetails/RaporTurKapsam'
import GrafikIstatistikler from '@/components/pages/bar/reporting/reportingDetails/GrafikIstatistikler'
import DetayliVeriTablosu from '@/components/pages/bar/reporting/reportingDetails/DetayliVeriTablosu'
import OngoreselAnalizTrendler from '@/components/pages/bar/reporting/reportingDetails/OngoreselAnalizTrendler'
import RaporSonucYorumlar from '@/components/pages/bar/reporting/reportingDetails/RaporSonucYorumlar'
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

