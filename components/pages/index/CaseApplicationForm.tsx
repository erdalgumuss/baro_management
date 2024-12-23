'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { createApplication } from '@/services/applicationService';

export default function CitizenApplicationForm() {
  const [formData, setFormData] = useState({
    applicantName: '', // Başvuran adı
    eventTitle: '', // Olay başlığı
    eventCategory: '', // Kategori
    description: '', // Açıklama
    contactDetails: {
      email: '',
      phone: '',
      address: '',
    }, // İletişim bilgileri
    documents: [] as File[], // Belgeler
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        documents: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Backend için uygun formatta veri oluşturma
    const applicationData = {
      applicantName: formData.applicantName,
      eventTitle: formData.eventTitle,
      eventCategory: formData.eventCategory,
      description: formData.description,
      date: new Date().toISOString(),
      documents: formData.documents.map((file) => ({
        name: file.name,
        type: file.type,
        date: new Date().toISOString(),
      })),
      contactDetails: formData.contactDetails,
    };

    try {
      await createApplication(applicationData);
      toast({
        title: 'Başvuru Başarılı',
        description: 'Başvurunuz başarıyla alındı.',
      });
      setFormData({
        applicantName: '',
        eventTitle: '',
        eventCategory: '',
        description: '',
        contactDetails: {
          email: '',
          phone: '',
          address: '',
        },
        documents: [],
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: `Başvuru gönderilirken bir hata oluştu: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="applicantName">Başvuran Adı</Label>
        <Input
          type="text"
          id="applicantName"
          name="applicantName"
          value={formData.applicantName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="eventTitle">Olay Başlığı</Label>
        <Input
          type="text"
          id="eventTitle"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="eventCategory">Olay Kategorisi</Label>
        <Select
          name="eventCategory"
          onValueChange={(value) =>
            setFormData((prevState) => ({ ...prevState, eventCategory: value }))
          }
        >
          <SelectTrigger>
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
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="email">E-posta</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.contactDetails.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.contactDetails.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Adres</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.contactDetails.address}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="documents">Belgeler (PDF)</Label>
        <Input
          type="file"
          id="documents"
          name="documents"
          onChange={handleFileChange}
          accept=".pdf"
          multiple
        />
      </div>
      <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
        Başvuruyu Gönder
      </Button>
    </form>
  );
}
