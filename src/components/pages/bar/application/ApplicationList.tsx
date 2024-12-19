'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ApplicationForm from './ApplicationForm'
import { useState } from 'react'

export default function ApplicationList({ applications = [], onDavaSelect }) {
  const [editingApplication, setEditingApplication] = useState(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Başvuru No</TableHead>
            <TableHead className="text-gray-300">Başvuran</TableHead>
            <TableHead className="text-gray-300">Dava Konusu</TableHead>
            <TableHead className="text-gray-300">Durum</TableHead>
            <TableHead className="text-gray-300">Başvuru Tarihi</TableHead>
            <TableHead className="text-gray-300">Atanan Avukat</TableHead>
            <TableHead className="text-gray-300">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} className="hover:bg-gray-800 border-gray-700 cursor-pointer" onClick={() => onDavaSelect(application)}>
              <TableCell className="text-gray-100">{application.applicationNumber || 'N/A'}</TableCell>
              <TableCell className="text-gray-100">{application.applicantName || 'N/A'}</TableCell>
              <TableCell className="text-gray-100">{application.caseSubject || 'N/A'}</TableCell>
              <TableCell className="text-gray-100">
                <Badge variant={application.status === 'active' ? 'default' : 'secondary'}>
                  {application.status || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-100">{application.applicationDate || 'N/A'}</TableCell>
              <TableCell className="text-gray-100">{application.assignedLawyer || 'Atanmadı'}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  className="text-yellow-500 hover:text-yellow-600"
                  onClick={() => setEditingApplication(application)}
                >
                  Düzenle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingApplication && (
        <ApplicationForm
          application={editingApplication}
          onClose={() => setEditingApplication(null)}
          onSubmit={(updatedApplication) => {
            onUpdateApplication(updatedApplication)
            setEditingApplication(null)
          }}
        />
      )}
    </>
  )
}

