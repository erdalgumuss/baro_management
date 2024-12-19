import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function RaporBaslikOzet({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{rapor.baslik}</CardTitle>
        <CardDescription className="text-gray-300">
          {rapor.ozet || 'Bu rapor, belirtilen zaman aralığında gerçekleşen olayların kapsamlı bir analizini sunmaktadır.'}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

