import { ReactNode } from 'react'
import Chatbot from './Chatbot'

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

