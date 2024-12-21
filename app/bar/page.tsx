'use client'

import { motion } from 'framer-motion'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import { DashboardCard } from '@/components/ui/DashboardCard'
import { DashboardCharts } from '@/components/shared/DashboardCharts'
import { FileText, Gavel, Users, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const cardData = [
    {
      title: "Toplam Başvuru",
      description: "Bu ayki başvuru sayısı",
      value: 254,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Aktif Davalar",
      description: "Şu an devam eden davalar",
      value: 189,
      icon: <Gavel className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: "Kayıtlı Avukatlar",
      description: "Sistemde kayıtlı avukat sayısı",
      value: 1203,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Hak İhlalleri",
      description: "Bu ay bildirilen hak ihlalleri",
      value: 37,
      icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 15, isPositive: false },
    },
  ]

  return (
    <BaroDashboard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">Baro Yönetim Paneli</h1>
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
          <h2 className="text-2xl font-semibold mb-4">Haftalık İstatistikler</h2>
          <DashboardCharts />
        </motion.div>
      </motion.div>
    </BaroDashboard>
  )
}

