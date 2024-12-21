'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { specializations } from '@/utils/mockData'

export default function AvukatList({ lawyers, onSelectLawyer, onDeleteLawyer, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredAndSortedLawyers = useMemo(() => {
    return lawyers
      .filter(lawyer =>
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specializationFilter === 'all' || lawyer.specialization === specializationFilter)
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else {
          return sortOrder === 'asc' ? a.activeCases - b.activeCases : b.activeCases - a.activeCases
        }
      })
  }, [lawyers, searchTerm, specializationFilter, sortBy, sortOrder])

  const handleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Avukat adı ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-800 text-gray-100 border-gray-700"
        />
        <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="Uzmanlık alanı" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="all">Tümü</SelectItem>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table className="border-gray-700">
        <TableHeader>
          <TableRow className="hover:bg-gray-800">
            <TableHead className="cursor-pointer text-gray-300" onClick={() => handleSort('name')}>
              Avukat Adı {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="text-gray-300">Uzmanlık Alanı</TableHead>
            <TableHead className="cursor-pointer text-gray-300" onClick={() => handleSort('activeCases')}>
              Aktif Davalar {sortBy === 'activeCases' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="text-gray-300">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedLawyers.map((lawyer) => (
            <TableRow 
              key={lawyer.id} 
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => onViewDetails(lawyer)}
            >
              <TableCell className="text-gray-100">{lawyer.name}</TableCell>
              <TableCell className="text-gray-100">{lawyer.specialization}</TableCell>
              <TableCell className="text-gray-100">{lawyer.activeCases}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

