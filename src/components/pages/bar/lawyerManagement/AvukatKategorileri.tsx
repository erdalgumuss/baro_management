'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const uzmanlıkAlanları = [
  'Ceza Hukuku',
  'Medeni Hukuk',
  'İş Hukuku',
  'İdare Hukuku',
  'Ticaret Hukuku',
  'Aile Hukuku'
]

export default function AvukatKategorileri({ lawyers, onUpdateLawyer }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [newSpecialization, setNewSpecialization] = useState('')

  const handleSpecializationChange = (specialization, isChecked) => {
    if (selectedLawyer) {
      const updatedSpecializations = isChecked
        ? [...selectedLawyer.specializations, specialization]
        : selectedLawyer.specializations.filter(s => s !== specialization)

      const updatedLawyer = {
        ...selectedLawyer,
        specializations: updatedSpecializations
      }

      onUpdateLawyer(updatedLawyer)
      setSelectedLawyer(updatedLawyer)
    }
  }

  const handleAddSpecialization = () => {
    if (newSpecialization && !uzmanlıkAlanları.includes(newSpecialization)) {
      uzmanlıkAlanları.push(newSpecialization)
      setNewSpecialization('')
    }
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setSelectedLawyer(lawyers.find(l => l.id.toString() === value))}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Avukat seçin" />
        </SelectTrigger>
        <SelectContent>
          {lawyers.map((lawyer) => (
            <SelectItem key={lawyer.id} value={lawyer.id.toString()}>{lawyer.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedLawyer && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Uzmanlık Alanı</TableHead>
                <TableHead>Yetki</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uzmanlıkAlanları.map((alan) => (
                <TableRow key={alan}>
                  <TableCell>{alan}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedLawyer.specializations?.includes(alan) || false}
                      onChange={(e) => handleSpecializationChange(alan, e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex space-x-2">
            <Input
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              placeholder="Yeni uzmanlık alanı"
            />
            <Button onClick={handleAddSpecialization}>Ekle</Button>
          </div>
        </>
      )}
    </div>
  )
}

