'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createCase } from '@/services/caseService';

export default function DavaEkleForm({ onClose, onSubmit }) {
  const [yeniDava, setYeniDava] = useState({
    caseNumber: '',
    title: '',
    summary: '',
    plaintiff: {
      name: '',
      email: '',
      phone: ''
    },
    defendant: '',
    assignedLawyer: '',
    category: '',
    openingDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYeniDava((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setYeniDava((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("Gönderilen category ID:", yeniDava.category);
  console.log("Gönderilen assignedLawyer ID:", yeniDava.assignedLawyer);
    try {
      await createCase(yeniDava);
      onSubmit();
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Yeni Dava Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caseNumber">Dava Numarası</Label>
            <Input
              id="caseNumber"
              name="caseNumber"
              value={yeniDava.caseNumber}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Dava Adı</Label>
            <Input
              id="title"
              name="title"
              value={yeniDava.title}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Dava Özeti</Label>
            <Textarea
              id="summary"
              name="summary"
              value={yeniDava.summary}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Başvuran Bilgileri</Label>
            <Input
              placeholder="Adı Soyadı"
              value={yeniDava.plaintiff.name}
              onChange={(e) => handleNestedChange('plaintiff', 'name', e.target.value)}
              className="bg-gray-700 text-gray-100 mb-2"
              required
            />
            <Input
              placeholder="E-posta"
              type="email"
              value={yeniDava.plaintiff.email}
              onChange={(e) => handleNestedChange('plaintiff', 'email', e.target.value)}
              className="bg-gray-700 text-gray-100 mb-2"
              required
            />
            <Input
              placeholder="Telefon"
              value={yeniDava.plaintiff.phone}
              onChange={(e) => handleNestedChange('plaintiff', 'phone', e.target.value)}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defendant">Karşı Taraf</Label>
            <Input
              id="defendant"
              name="defendant"
              value={yeniDava.defendant}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedLawyer">Atanan Avukat</Label>
            <Input
              id="assignedLawyer"
              name="assignedLawyer"
              value={yeniDava.assignedLawyer}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openingDate">Başlangıç Tarihi</Label>
            <Input
              id="openingDate"
              name="openingDate"
              type="date"
              value={yeniDava.openingDate}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" value={yeniDava.category} onValueChange={(value) => handleChange({ target: { name: 'category', value } })}>
              <SelectTrigger className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="67688842f6548c91aa3b44b8">Ceza Davası</SelectItem>
                <SelectItem value="67688842f6548c91aa3b44b9">Hukuk Davası</SelectItem>
                <SelectItem value="idari">İdari Dava</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
            <Button type="submit">Dava Ekle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
