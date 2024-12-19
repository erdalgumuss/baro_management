'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

const welcomeMessage = `Merhaba! Size nasıl yardımcı olabilirim? Örneğin:
- Bu ayki toplam başvuru sayısını öğrenebilirsiniz
- 1202342 numaralı dosyaya hangi avukatın atandığını sorabilirsiniz
- Ayşe Yılmaz isimli kişinin başvuru detayları hakkında bilgi isteyebilirsiniz`

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: welcomeMessage, sender: 'bot' }])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }])
      setInputMessage('')
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Yakında hizmete geçeceğim.', sender: 'bot' }])
      }, 500)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <MessageCircle />
        </Button>
      )}
      {isOpen && (
        <Card className="w-80 h-96 flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Baro Asistanı</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full w-full pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-secondary text-secondary-foreground'
                  } max-w-[90%] ${message.sender === 'user' ? 'float-right clear-both' : 'float-left clear-both'}`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

