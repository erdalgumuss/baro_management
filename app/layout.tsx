import { Inter } from 'next/font/google'
import ChatbotLayout from '@/components/ui/ChatbotLayout'
import AppWrapper from '@/components/AppWrapper/AppWrapper'
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
        <AppWrapper>
          <ChatbotLayout>
            {children}
          </ChatbotLayout>
        </AppWrapper>
      </body>
    </html>
  )
}
