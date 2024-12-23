/**
 * Başvuru Durumları
 */
export enum ApplicationStatus {
  PENDING = "pending", // Beklemede
  LAWYER_ASSIGNED = "lawyer_assigned", // Avukat Atandı
  UNDER_REVIEW = "under_review", // İnceleniyor
  CASE_OPENED = "case_opened", // Dava Açıldı
}

/**
 * Kategori Tipi
 */
export interface Category {
  id: string; // Kategori ID'si
  name: string; // Kategori adı
  description?: string; // Opsiyonel: Kategori açıklaması
  isActive: boolean; // Kategori aktif mi?
}

/**
 * Şehir Tipi
 */
export interface City {
  id: string; // Şehir ID'si
  name: string; // Şehir adı
  region?: string; // Opsiyonel: Bölge (ör. Marmara, Ege)
}

/**
 * Döküman Tipi
 */
export interface Document {
  id: string; // Döküman ID'si
  url: string; // Döküman URL'si
  type: string; // Döküman türü (ör. "pdf", "image")
  size: number; // Döküman boyutu (byte cinsinden)
  uploadedAt: string; // Yüklenme zamanı (ISO formatında tarih)
  relatedApplication: string; // İlgili başvuru ID'si
}

/**
 * Başvuru Tipi
 */
export interface Application {
  id: string; // Başvuru ID'si
  tcNumber: string; // Vatandaşın TC No
  name: string; // Başvuru sahibi adı
  surname: string; // Başvuru sahibi soyadı
  phone: string; // Telefon numarası
  email: string; // E-posta adresi
  address: string; // Adres bilgisi
  category: Category | string; // Kategori bilgisi (ID veya detay)
  title: string; // Başvuru başlığı
  details: string; // Başvuru detayları
  documents?: Document[]; // Opsiyonel: Dökümanlar
  status: ApplicationStatus; // Başvuru durumu
  assignedLawyer?: string; // Atanmış avukat ID'si (opsiyonel)
  city?: City | string; // Şehir bilgisi (ID veya detay)
  complaintDate: string; // Şikayet tarihi (ISO formatında tarih)
  createdAt: string; // Oluşturulma tarihi (ISO formatında tarih)
  updatedAt: string; // Güncellenme tarihi (ISO formatında tarih)
}
