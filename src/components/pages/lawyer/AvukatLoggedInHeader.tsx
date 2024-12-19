'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Davalar', href: '/avukat/davalar' },
  { name: 'Takvim', href: '/avukat/takvim' },
  { name: 'Performans ve İstatistikler', href: '/avukat/performans-istatistikler' }
]

export default function AvukatLoggedInHeader() {
  const [activeItem, setActiveItem] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const currentItem = navItems.find(item => pathname.startsWith(item.href))
    if (currentItem) {
      setActiveItem(currentItem.name)
    }
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8"
    >
      <nav className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <ul className="flex items-center justify-center space-x-1 flex-wrap gap-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeItem === item.name
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground/80 hover:text-foreground hover:bg-primary/10'
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

