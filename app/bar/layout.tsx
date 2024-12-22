'use client'

import { ReactNode, useEffect } from 'react'
import LoggedInHeader from '@/components/pages/bar/LoggedInHeader'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Settings, LogOut } from 'lucide-react'
import ChatbotLayout from '@/components/ui/ChatbotLayout'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userInfo } = useAuth()
  const router = useRouter()

  // Kullanıcı yönlendirme
  useEffect(() => {
    if (!userInfo) return

    if (userInfo.role === 'lawyer') {
      router.replace('/lawyer')
    }
  }, [userInfo, router])

  // Rol kontrolleri
  const isAdmin = userInfo?.role === 'admin'

  return (
    <ChatbotLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="sticky top-0 z-50 bg-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Baro Yönetim Sistemi
                </span>
              </div>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt={userInfo?.name || 'Kullanıcı'} />
                        <AvatarFallback>BY</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userInfo?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userInfo?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Ayarlar</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/bar/userm">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Üye Yönetimi</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <LoggedInHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
          {children}
        </main>
      </div>
    </ChatbotLayout>
  )
}
