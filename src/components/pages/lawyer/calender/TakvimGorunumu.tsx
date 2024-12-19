'use client'

import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TakvimGorunumuProps {
  selectedDate: Date | null
  onSelectDate: (date: Date | null) => void
  onSelectDurusma: (durusma: any) => void
}

export function TakvimGorunumu({ selectedDate, onSelectDate, onSelectDurusma }: TakvimGorunumuProps) {
  // Bu mock veriyi gerçek verilerle değiştirin
  const events = [
    { date: new Date(2023, 5, 15), title: 'Yılmaz vs. ABC Şirketi', type: 'durusma' },
    { date: new Date(2023, 5, 20), title: 'Kaya Ailesi Veraset', type: 'belge' },
    { date: new Date(2023, 5, 25), title: 'Müvekkil Görüşmesi', type: 'toplanti' },
  ]

  const getDayContent = (day: Date | undefined) => {
    if (!day) return null;

    const dayEvents = events.filter(event => 
      event.date && 
      event.date.toDateString() === day.toDateString()
    )
    if (dayEvents.length > 0) {
      return (
        <div className="flex flex-col items-center">
          <span>{day.getDate()}</span>
          <Badge variant={dayEvents[0].type === 'durusma' ? 'destructive' : 'default'} className="w-2 h-2 rounded-full p-0" />
        </div>
      )
    }
    return day.getDate()
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="rounded-md border"
          components={{
            DayContent: ({ day }) => day ? getDayContent(day) : null
          }}
        />
        {selectedDate && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Seçili Tarih Etkinlikleri</h3>
            {events
              .filter(event => 
                event.date && selectedDate && 
                event.date.toDateString() === selectedDate.toDateString()
              )
              .map((event, index) => (
                <div 
                  key={index} 
                  className="mb-2 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => onSelectDurusma(event)}
                >
                  <Badge variant={event.type === 'durusma' ? 'destructive' : 'default'} className="mr-2">
                    {event.type}
                  </Badge>
                  {event.title}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

