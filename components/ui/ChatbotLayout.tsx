import { ReactNode } from 'react'
import Chatbot from '../layout/Chatbot'

interface ChatbotLayoutProps {
  children: ReactNode
}

export default function ChatbotLayout({ children }: ChatbotLayoutProps) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  )
}

