import { ReactNode } from 'react'
import LoggedInHeader from './LoggedInHeader'
import Footer from './Footer'

interface BaroDashboardProps {
  children: ReactNode
}

export default function BaroDashboard({ children }: BaroDashboardProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <LoggedInHeader />
      <main className="flex-grow mt-16 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

