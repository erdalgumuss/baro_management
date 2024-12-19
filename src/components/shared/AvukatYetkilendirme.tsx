'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export default function AvukatYetkilendirme({ lawyers, onUpdateLawyer }) {
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  const caseTypes = ['Ceza Davası', 'Hukuk Davası', 'İdari Dava', 'İş Davası', 'Aile Hukuku']

  const handlePermissionChange = (caseType, isChecked) => {
    if (selectedLawyer) {
      const updatedLawyer = {
        ...selectedLawyer,
        permissions: {
          ...selectedLawyer.permissions,
          [caseType]: isChecked,
        },
      }
      setSelectedLawyer(updatedLawyer)
    }
  }

  const handleSavePermissions = () => {
    if (selectedLawyer) {
      onUpdateLawyer(selectedLawyer)
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
                <TableHead>Dava Türü</TableHead>
                <TableHead>Yetki</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseTypes.map((caseType) => (
                <TableRow key={caseType}>
                  <TableCell>{caseType}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedLawyer.permissions?.[caseType] || false}
                      onCheckedChange={(isChecked) => handlePermissionChange(caseType, isChecked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleSavePermissions}>Yetkileri Kaydet</Button>
        </>
      )}
    </div>
  )
}

