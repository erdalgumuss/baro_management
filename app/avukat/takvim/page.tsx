'use client'

import { useState } from 'react'
import AvukatDashboard from '@/components/AvukatDashboard'
import { TakvimGorunumu } from '@/components/avukat/TakvimGorunumu'
import { YaklasanDurusmalar } from '@/components/avukat/YaklasanDurusmalar'
import { HatirlaticiListesi } from '@/components/avukat/HatirlaticiListesi'
import { DurusmaDetayModal } from '@/components/avukat/DurusmaDetayModal'

export default function TakvimSayfasi() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedDurusma, setSelectedDurusma] = useState<any | null>(null)

  return (
    <AvukatDashboard>
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">Duruşma Takvimi</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TakvimGorunumu 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate}
              onSelectDurusma={setSelectedDurusma}
            />
          </div>
          <div className="space-y-6">
            <YaklasanDurusmalar onSelectDurusma={setSelectedDurusma} />
            <HatirlaticiListesi />
          </div>
        </div>
      </div>
      {selectedDurusma && (
        <DurusmaDetayModal 
          durusma={selectedDurusma} 
          onClose={() => setSelectedDurusma(null)} 
        />
      )}
    </AvukatDashboard>
  )
}

