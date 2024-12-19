'use client'

import { motion } from 'framer-motion'
import AvukatDashboard from '@/components/AvukatDashboard'
import { DashboardCard } from '@/components/DashboardCard'
import { DashboardCharts } from '@/components/DashboardCharts'
import { FileText, Gavel, Users, AlertTriangle } from 'lucide-react'

export default function AvukatDashboardPage() {
  const cardData = [
    {
      title: "Aktif Davalar",
      description: "Şu an devam eden davalarınız",
      value: 15,
      icon: <Gavel className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Tamamlanan Davalar",
      description: "Bu ay tamamlanan davalar",
      value: 8,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 1, isPositive: true },
    },
    {
      title: "Müvekkil Sayısı",
      description: "Toplam müvekkil sayınız",
      value: 45,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Yaklaşan Duruşmalar",
      description: "Önümüzdeki 7 gün içindeki duruşmalar",
      value: 6,
      icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 2, isPositive: false },
    },
  ]

  return (
    <AvukatDashboard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">Avukat Paneli</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DashboardCard {...card} variant={index === 0 ? "primary" : "default"} />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Aylık Performans</h2>
          <DashboardCharts />
        </motion.div>
      </motion.div>
    </AvukatDashboard>
  )
}

