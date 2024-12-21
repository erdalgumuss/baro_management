import { Inter } from 'next/font/google'
import ChatbotLayout from '@/components/ui/ChatbotLayout'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatbotLayout>
          {children}
        </ChatbotLayout>
      </body>
    </html>
  )
}

