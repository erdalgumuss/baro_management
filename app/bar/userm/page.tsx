'use client'

import { useState, useEffect } from 'react'
import BaroDashboard from '@/components/pages/bar/BaroDashboard'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AddMemberModal from '@/components/pages/bar/admin/AddMemberModal'
import ChangeMemberRoleModal from '@/components/pages/bar/admin/ChangeMemberRoleModal'
import DeleteMemberModal from '@/components/pages/bar/admin/DeleteMemberModal'


interface Member {
  id: number
  name: string
  role: 'lawyer' | 'baro_officer'
  tcNumber: string
  referenceNumber?: string
}

export default function MemberManagementPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [memberType, setMemberType] = useState<'lawyer' | 'baro_officer' | null>(null)

  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const mockMembers: Member[] = [
    { id: 1, name: 'Ahmet Yılmaz', role: 'lawyer', tcNumber: '12345678901', referenceNumber: 'REF123' },
    { id: 2, name: 'Ayşe Kaya', role: 'baro_officer', tcNumber: '23456789012' },
    { id: 3, name: 'Mehmet Demir', role: 'lawyer', tcNumber: '34567890123', referenceNumber: 'REF456' },
  ]
  

  useEffect(() => {
    // Backend bağlantısı yerine geçici veri kullanıyoruz
    const fetchMembers = async () => {
      try {
        setMembers(mockMembers) // Mock veriyi yükle
      } catch (error) {
        console.error('Üye listesi alınırken hata oluştu:', error)
        alert('Üye listesi yüklenemedi. Lütfen tekrar deneyin.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchMembers()
  }, [])
  

  const onMemberAdded = (newMember: Member) => {
    setMembers([
      ...members,
      { ...newMember, id: Math.floor(Math.random() * 1000) }, // Mock bir id üret
    ])
    setShowAddMemberModal(false)
  }
  

  const onRoleChanged = (memberId: number, newRole: 'lawyer' | 'baro_officer') => {
    setMembers(members.map(member =>
      member.id === memberId ? { ...member, role: newRole } : member
    ))
    setShowChangeRoleModal(false)
  }
  

const onMemberDeleted = (memberId: number) => {
  setMembers(members.filter(member => member.id !== memberId))
  setShowDeleteModal(false)
}


  const openModal = (type: 'add' | 'changeRole' | 'delete', member?: Member) => {
    if (type === 'add') {
      setMemberType('lawyer') // veya 'baro_officer'
      setShowAddMemberModal(true)
    } else if (type === 'changeRole' && member) {
      setSelectedMember(member)
      setShowChangeRoleModal(true)
    } else if (type === 'delete' && member) {
      setSelectedMember(member)
      setShowDeleteModal(true)
    }
  }

  return (
    <BaroDashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Üye Yönetimi</h1>
        <div className="flex space-x-4">
          <Button onClick={() => openModal('add', null)}>Avukat Ekle</Button>
          <Button onClick={() => openModal('add', null)}>Baro Üyesi Ekle</Button>
        </div>
        {isLoading ? (
          <p>Yükleniyor...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>TC Kimlik No</TableHead>
                <TableHead>Referans No</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role === 'lawyer' ? 'Avukat' : 'Baro Üyesi'}</TableCell>
                  <TableCell>{member.tcNumber}</TableCell>
                  <TableCell>{member.referenceNumber || 'Yok'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openModal('changeRole', member)}>
                        Yetki Değiştir
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => openModal('delete', member)}>
                        Sil
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {showAddMemberModal && (
        <AddMemberModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          memberType={memberType}
          onMemberAdded={onMemberAdded}
        />
      )}
      {showChangeRoleModal && selectedMember && (
        <ChangeMemberRoleModal
          isOpen={showChangeRoleModal}
          onClose={() => setShowChangeRoleModal(false)}
          member={selectedMember}
          onRoleChanged={onRoleChanged}
        />
      )}
      {showDeleteModal && selectedMember && (
        <DeleteMemberModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          member={selectedMember}
          onMemberDeleted={onMemberDeleted}
        />
      )}
    </BaroDashboard>
  )
}
