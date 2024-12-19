import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RaporSonucYorumlar({ rapor }) {
  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle>Rapor Sonuçları ve Yorumlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Bulgular</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>2024 yılında aile hukuku davaları %15 arttı.</li>
              <li>Kadına yönelik şiddet vakaları 2023'e göre %10 azaldı.</li>
              <li>Ticari davaların ortalama çözüm süresi 2 ay kısaldı.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Eylem Önerileri</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Aile hukuku davalarına yönelik yeni bir uzmanlaşma programı başlatılmalı.</li>
              <li>Kadına karşı şiddet vakalarında uygulanan önleyici tedbirler güçlendirilmeli.</li>
              <li>Ticari davaların hızlı çözümü için alternatif uyuşmazlık çözüm yöntemleri teşvik edilmeli.</li>
            </ul>
          </div>
        </div>
      </CardContent></Card>
  )
}

