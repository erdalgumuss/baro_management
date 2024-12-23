/**
 * Dava Durumları
 */
export enum CaseStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed",
  WON = "won",
  LOST = "lost",
}

/**
 * Dava Belgeleri
 */
export interface ICaseDocument {
  name: string;
  type: string; // Ör. dilekçe, tutanak
  pdfUrl: string; // AWS S3 gibi bir sistemde saklanan belge URL'si
  uploadedAt: Date;
}

/**
 * Dava Modeli Arayüzü
 */
export interface ICase {
  caseNumber: string; // Dava numarası
  title: string; // Dava başlığı
  summary: string; // Dava özeti
  plaintiff: { name: string; email: string; phone: string }; // Başvuran bilgileri
  defendant?: string; // Karşı taraf bilgileri
  category: string; // Kategori referansı (ObjectId tipi string olarak temsil ediliyor)
  status: CaseStatus; // Dava durumu
  assignedLawyer: string; // Atanan avukat referansı (ObjectId tipi string olarak temsil ediliyor)
  openingDate: Date; // Açılış tarihi
  hearings: string[]; // Duruşma referansları (ObjectId tipi string olarak temsil ediliyor)
  documents: ICaseDocument[]; // Dava belgeleri
  statistics: {
    durationInDays?: number; // Dava süreci (gün)
    categoryAverage?: number; // Kategori bazlı çözüm süreci (gün)
  };
  createdAt: Date;
  updatedAt: Date;
}
