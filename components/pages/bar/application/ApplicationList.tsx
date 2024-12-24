'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ApplicationForm from './ApplicationForm';
import { useState } from 'react';

interface Application {
  _id: string;
  applicantName: string;
  contactDetails: {
    email: string;
    phone: string;
    address: string;
  };
  eventTitle: string;
  eventCategory: string;
  status: string;
  date: string;
  assignedLawyer?: string | null;
}

interface ApplicationListProps {
  applications: Application[];
  onUpdateApplication: (updatedApplication: Application) => Promise<void>;
  onDavaSelect: (application: Application) => void;
}

export default function ApplicationList({
  applications = [],
  onUpdateApplication,
  onDavaSelect,
}: ApplicationListProps) {
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Başvuran Adı</TableHead>
            <TableHead className="text-gray-300">E-posta</TableHead>
            <TableHead className="text-gray-300">Telefon</TableHead>
            <TableHead className="text-gray-300">Başvuru Başlığı</TableHead>
            <TableHead className="text-gray-300">Durum</TableHead>
            <TableHead className="text-gray-300">Başvuru Tarihi</TableHead>
            <TableHead className="text-gray-300">Atanan Avukat</TableHead>
            <TableHead className="text-gray-300">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
<TableBody>
  {applications.map((application) => (
    <TableRow
      key={application._id}
      className="hover:bg-gray-800 border-gray-700 cursor-pointer"
      onClick={() => onDavaSelect(application)}
    >
      <TableCell className="text-gray-100">{application.applicantName || 'N/A'}</TableCell>
      <TableCell className="text-gray-100">
        {application.contactDetails?.email || 'N/A'}
      </TableCell>
      <TableCell className="text-gray-100">
        {application.contactDetails?.phone || 'N/A'}
      </TableCell>
      <TableCell className="text-gray-100">{application.eventTitle || 'N/A'}</TableCell>
      <TableCell className="text-gray-100">
        <Badge variant={application.status === 'beklemede' ? 'default' : 'secondary'}>
          {application.status || 'N/A'}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-100">
        {application.date ? new Date(application.date).toLocaleDateString() : 'N/A'}
      </TableCell>
      <TableCell className="text-gray-100">{application.assignedLawyer || 'Atanmadı'}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          className="text-yellow-500 hover:text-yellow-600"
          onClick={(e) => {
            e.stopPropagation();
            setEditingApplication(application);
          }}
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
            onUpdateApplication(updatedApplication);
            setEditingApplication(null);
          }}
        />
      )}
    </>
  );
}
