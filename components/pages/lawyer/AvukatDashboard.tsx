import { ReactNode } from 'react'
import AvukatLoggedInHeader from './AvukatLoggedInHeader'
import Footer from '../../layout/Footer'

interface AvukatDashboardProps {
  children: ReactNode
}

export default function AvukatDashboard({ children }: AvukatDashboardProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <AvukatLoggedInHeader />
      <main className="flex-grow mt-16 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

