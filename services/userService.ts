import apiClient from '@/services/apiClient'
import { Member } from '@/store/useMemberStore'

export const getMembers = async (): Promise<Member[]> => {
  const response = await apiClient.get('/members')
  return response.data
}

export const addMember = async (
    newMember: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ id: number; createdAt: string; updatedAt: string; referenceNumber: string }> => {
    const response = await apiClient.post('/members', newMember)
    return response.data
  }
  

export const updateMemberRole = async (id: number, role: Member['role']): Promise<void> => {
  await apiClient.patch(`/members/${id}/role`, { role })
}

export const deleteMember = async (id: number): Promise<void> => {
  await apiClient.delete(`/members/${id}`)
}
