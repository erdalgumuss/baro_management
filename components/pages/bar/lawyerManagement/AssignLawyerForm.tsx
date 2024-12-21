'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockLawyers, specializations } from '@/utils/mockData'

export default function AssignLawyerForm({ application, onClose, onAssign }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('all')
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  const filteredLawyers = useMemo(() => {
    return mockLawyers.filter(lawyer => 
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specializationFilter === 'all' || lawyer.specialization === specializationFilter)
    )
  }, [searchTerm, specializationFilter])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedLawyer) {
      onAssign(application.id, selectedLawyer.name)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-gray-50">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Avukat Ata</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="searchLawyer" className="text-gray-700">Avukat Ara</Label>
              <Input
                id="searchLawyer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-900"
                placeholder="Avukat adı ile ara..."
              />
            </div>
            <div>
              <Label htmlFor="specializationFilter" className="text-gray-700">Uzmanlık Alanı</Label>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                <SelectTrigger className="w-[180px] bg-white text-gray-900">
                  <SelectValue placeholder="Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-900">Avukat Adı</TableHead>
                <TableHead className="text-gray-900">Uzmanlık Alanı</TableHead>
                <TableHead className="text-gray-900">Aktif Davalar</TableHead>
                <TableHead className="text-gray-900">Seç</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLawyers.map((lawyer) => (
                <TableRow key={lawyer.id}>
                  <TableCell className="text-gray-800">{lawyer.name}</TableCell>
                  <TableCell className="text-gray-800">{lawyer.specialization}</TableCell>
                  <TableCell className="text-gray-800">{lawyer.activeCases}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLawyer(lawyer)}
                      className={`text-primary bg-white ${selectedLawyer?.id === lawyer.id ? 'ring-2 ring-primary' : ''}`}
                    >
                      Seç
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="bg-white text-gray-900">İptal</Button>
          <Button onClick={handleSubmit} disabled={!selectedLawyer} className="bg-primary text-white">Avukat Ata</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

