import { create } from 'zustand'
import { getMembers, addMember, updateMemberRole, deleteMember } from '../services/userService'

export interface Member {
  id: number
  tcNumber: string
  name: string
  surname: string
  email?: string
  phone?: string
  password?: string
  role: 'lawyer' | 'baro_officer'
  referenceNumber?: string
  refreshToken?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

interface MemberStore {
  members: Member[]
  isLoading: boolean
  error: string | null
  fetchMembers: () => Promise<void>
  addMember: (newMember: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  changeRole: (id: number, role: Member['role']) => Promise<void>
  deleteMember: (id: number) => Promise<void>
}

export const useMemberStore = create<MemberStore>((set) => ({
  members: [],
  isLoading: false,
  error: null,

  fetchMembers: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await getMembers()
      set({ members: data })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Üye listesi alınırken hata oluştu:', error.message)
        set({ error: error.message })
      } else {
        console.error('Bilinmeyen bir hata oluştu:', error)
        set({ error: 'Üye listesi yüklenemedi. Lütfen tekrar deneyin.' })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  addMember: async (newMember) => {
    set({ isLoading: true, error: null })
    try {
      const response = await addMember(newMember)
      set((state) => ({
        members: [...state.members, { ...newMember, id: response.id, createdAt: response.createdAt, updatedAt: response.updatedAt }],
      }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Üye ekleme hatası:', error.message)
        set({ error: error.message })
      } else {
        console.error('Bilinmeyen bir hata oluştu:', error)
        set({ error: 'Üye eklenirken bir hata oluştu. Lütfen tekrar deneyin.' })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  changeRole: async (id, role) => {
    set({ isLoading: true, error: null })
    try {
      await updateMemberRole(id, role)
      set((state) => ({
        members: state.members.map((member) =>
          member.id === id ? { ...member, role } : member
        ),
      }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Rol değiştirme hatası:', error.message)
        set({ error: error.message })
      } else {
        console.error('Bilinmeyen bir hata oluştu:', error)
        set({ error: 'Rol değiştirilemedi. Lütfen tekrar deneyin.' })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  deleteMember: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await deleteMember(id)
      set((state) => ({
        members: state.members.filter((member) => member.id !== id),
      }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Üye silme hatası:', error.message)
        set({ error: error.message })
      } else {
        console.error('Bilinmeyen bir hata oluştu:', error)
        set({ error: 'Üye silinemedi. Lütfen tekrar deneyin.' })
      }
    } finally {
      set({ isLoading: false })
    }
  },
}))
