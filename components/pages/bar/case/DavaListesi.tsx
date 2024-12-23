'use client'

import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useCaseStore } from '@/store/useCaseStore';

export default function DavaListesi({ onDavaSelect }) {
  const { cases, fetchCases, isLoading, error } = useCaseStore();

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return (
    <div>
      {isLoading ? (
        <p className="text-gray-300">Yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500">Hata: {error}</p>
      ) : (
        <Table className="border-gray-700">
          <TableHeader>
            <TableRow className="hover:bg-gray-800 border-gray-700">
              <TableHead className="text-gray-300">Dava Numarası</TableHead>
              <TableHead className="text-gray-300">Dava Adı</TableHead>
              <TableHead className="text-gray-300">Başvuran</TableHead>
              <TableHead className="text-gray-300">Avukat</TableHead>
              <TableHead className="text-gray-300">Durum</TableHead>
              <TableHead className="text-gray-300">Başlangıç Tarihi</TableHead>
              <TableHead className="text-gray-300">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases && cases.length > 0 ? (
              cases.map((dava) => (
                <TableRow key={dava.caseNumber} className="hover:bg-gray-800 border-gray-700">
                  <TableCell className="text-gray-100">{dava.caseNumber}</TableCell>
                  <TableCell className="text-gray-100">{dava.title}</TableCell>
                  <TableCell className="text-gray-100">{dava.plaintiff.name}</TableCell>
                  <TableCell className="text-gray-100">{dava.assignedLawyer}</TableCell>
                  <TableCell className="text-gray-100">{dava.status}</TableCell>
                  <TableCell className="text-gray-100">{new Date(dava.openingDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => onDavaSelect(dava)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Detaylar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-100">Dava bulunamadı.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
