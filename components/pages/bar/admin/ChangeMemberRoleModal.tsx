'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'
import { updateMemberRole } from '@/services/userService'

interface ChangeMemberRoleModalProps {
  isOpen: boolean
  onClose: () => void
  member: {
    id: number
    name: string
    role: 'lawyer' | 'baro_officer'
  }
  onRoleChanged: (memberId: number, newRole: 'lawyer' | 'baro_officer') => void
}

export default function ChangeMemberRoleModal({ isOpen, onClose, member, onRoleChanged }: ChangeMemberRoleModalProps) {
  const [newRole, setNewRole] = useState<'lawyer' | 'baro_officer'>(member.role)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newRole === member.role) {
      alert('Yeni rol mevcut rol ile aynı.')
      return
    }

    setIsLoading(true)
    try {
      await updateMemberRole(member.id, newRole)
      onRoleChanged(member.id, newRole)
      onClose()
    } catch (error) {
      console.error('Rol değiştirme hatası:', error)
      alert('Rol değiştirilemedi. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    { value: 'lawyer', label: 'Avukat' },
    { value: 'baro_officer', label: 'Baro Üyesi' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Üye Yetkisini Değiştir</DialogTitle>
          <DialogDescription>
            {member.name} için yeni bir yetki seçin.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Select value={newRole} onValueChange={(value: 'lawyer' | 'baro_officer') => setNewRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Yeni yetki seçin" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
