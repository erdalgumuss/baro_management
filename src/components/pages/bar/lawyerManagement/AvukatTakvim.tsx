'use client'

import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

moment.locale('tr')

const localizer = momentLocalizer(moment)

export default function AvukatTakvim({ lawyers }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  // Bu veriler normalde bir API'den alınacaktır. Şimdilik mock data kullanıyoruz.
  const events = [
    {
      title: 'Duruşma - Ceza Davası',
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
    },
    {
      title: 'Müvekkil Görüşmesi',
      start: new Date(2023, 5, 16, 14, 0),
      end: new Date(2023, 5, 16, 15, 0),
    },
    {
      title: 'Belge Hazırlama',
      start: new Date(2023, 5, 17, 9, 0),
      end: new Date(2023, 5, 17, 11, 0),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="lawyer-select" className="block text-sm font-medium text-gray-200">
          Avukat Seç
        </label>
        <Select onValueChange={(value) => setSelectedLawyer(lawyers.find(l => l.id.toString() === value))}>
          <SelectTrigger id="lawyer-select" className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Avukat seçin" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            {lawyers.map((lawyer) => (
              <SelectItem key={lawyer.id} value={lawyer.id.toString()}>{lawyer.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedLawyer && (
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
          />
        </div>
      )}
    </div>
  )
}

