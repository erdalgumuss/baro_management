'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BaroApplicationForm({ application, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    contactDetails: {
      email: '',
      phone: '',
      address: '',
    },
    eventTitle: '',
    eventCategory: '',
    status: 'beklemede',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    if (application) {
      setFormData({
        applicantName: application.applicantName || '',
        contactDetails: {
          email: application.contactDetails?.email || '',
          phone: application.contactDetails?.phone || '',
          address: application.contactDetails?.address || '',
        },
        eventTitle: application.eventTitle || '',
        eventCategory: application.eventCategory || '',
        status: application.status || 'beklemede',
        date: application.date || new Date().toISOString().split('T')[0],
        description: application.description || '',
      });
    }
  }, [application]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['email', 'phone', 'address'].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        contactDetails: {
          ...prevState.contactDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>{application ? 'Başvuru Düzenle' : 'Yeni Başvuru Ekle'}</DialogTitle>
          <DialogDescription>
            Lütfen başvuru bilgilerini eksiksiz doldurunuz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applicantName">Başvuran Adı</Label>
            <Input
              id="applicantName"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              value={formData.contactDetails.email}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.contactDetails.phone}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.contactDetails.address}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventTitle">Başvuru Başlığı</Label>
            <Input
              id="eventTitle"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventCategory">Başvuru Kategorisi</Label>
            <Select
              name="eventCategory"
              onValueChange={(value) => handleChange({ target: { name: 'eventCategory', value } })}
            >
              <SelectTrigger className="bg-gray-700 text-gray-100">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="isHukuku">İş Hukuku</SelectItem>
                <SelectItem value="egitimHakki">Eğitim Hakkı</SelectItem>
                <SelectItem value="ifadeOzgurlugu">İfade Özgürlüğü</SelectItem>
                <SelectItem value="kadinaKarsiSiddet">Kadına Karşı Şiddet</SelectItem>
                <SelectItem value="cocukHaklari">Çocuk Hakları</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Başvuru Tarihi</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {application ? 'Güncelle' : 'Ekle'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
