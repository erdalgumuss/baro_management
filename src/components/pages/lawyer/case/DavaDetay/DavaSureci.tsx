import { Timeline, TimelineItem, TimelineItemProps } from "@/components/ui/timeline"

interface DavaSureciProps {
  dava: any
}

export function DavaSureci({ dava }: DavaSureciProps) {
  const surecItems = dava?.surec || []

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dava Süreci</h3>
      {surecItems.length > 0 ? (
        <Timeline>
          {surecItems.map((item: TimelineItemProps, index: number) => (
            <TimelineItem key={index} {...item} />
          ))}
        </Timeline>
      ) : (
        <p>Bu dava için henüz süreç bilgisi bulunmamaktadır.</p>
      )}
    </div>
  )
}

