import { DavaKarti } from "./DavaKarti"

interface DavaListesiProps {
  davalar: any[]
  onDetayGor: (id: string) => void
}

export function DavaListesi({ davalar, onDetayGor }: DavaListesiProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {davalar.map(dava => (
        <DavaKarti
          key={dava.id}
          {...dava}
          onDetayGor={onDetayGor}
        />
      ))}
    </div>
  )
}

