import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DavaKartiProps {
  id: string
  ad: string
  numara: string
  durum: 'aktif' | 'tamamlanmis' | 'beklemede'
  basvuran: string
  avukat: string
  konu: string
  basariOrani: number
  sonrakiDurusma?: string
  onDetayGor: (id: string) => void
}

export function DavaKarti({
  id,
  ad,
  numara,
  durum,
  basvuran,
  avukat,
  konu,
  basariOrani,
  sonrakiDurusma,
  onDetayGor
}: DavaKartiProps) {
  const durumRenk = {
    aktif: "bg-green-500",
    tamamlanmis: "bg-blue-500",
    beklemede: "bg-yellow-500"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{ad}</span>
          <Badge className={`${durumRenk[durum]}`}>{durum}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Dava No:</strong> {numara}</p>
          <p><strong>Başvuran:</strong> {basvuran}</p>
          <p><strong>Avukat:</strong> {avukat}</p>
          <p><strong>Konu:</strong> {konu}</p>
          <p><strong>Başarı Oranı:</strong> {basariOrani}%</p>
          {sonrakiDurusma && (
            <p><strong>Sonraki Duruşma:</strong> {sonrakiDurusma}</p>
          )}
        </div>
        <Button 
          onClick={() => onDetayGor(id)} 
          className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Detayları Gör
        </Button>
      </CardContent>
    </Card>
  )
}

