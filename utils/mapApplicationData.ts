import { Application, ApplicationStatus, Category, Document, City } from "@/types/application";

/**
 * Backend'den gelen başvuru verilerini frontend tipiyle eşleştirir.
 * @param rawData Backend'den gelen ham başvuru verileri
 * @returns Frontend'de kullanılabilir Application tipi
 */
export const mapApplicationData = (rawData: any): Application => {
  return {
    id: rawData.id || rawData._id, // Backend'de _id olabilir
    tcNumber: rawData.tcNumber || "",
    name: rawData.name || rawData.applicantName || "",
    surname: rawData.surname || "",
    phone: rawData.phone || "",
    email: rawData.email || "",
    address: rawData.address || "",
    category: rawData.category || { id: "", name: rawData.eventCategory || "Bilinmiyor", isActive: true } as Category,
    title: rawData.title || rawData.eventTitle || "",
    details: rawData.details || "",
    documents: rawData.documents?.map((doc: any): Document => ({
      id: doc.id || doc._id,
      url: doc.pdfUrl || doc.url,
      type: doc.type || "unknown",
      size: doc.size || 0,
      uploadedAt: doc.uploadedAt || new Date().toISOString(),
      relatedApplication: doc.relatedApplication || "",
    })) || [],
    status: rawData.status as ApplicationStatus || ApplicationStatus.PENDING,
    assignedLawyer: rawData.assignedLawyer || null,
    city: rawData.city || { id: "", name: rawData.cityName || "Bilinmiyor" } as City,
    complaintDate: rawData.complaintDate || rawData.date || "",
    createdAt: rawData.createdAt || "",
    updatedAt: rawData.updatedAt || "",
  };
};

/**
 * Backend'den gelen başvuru verileri listesini frontend tipiyle eşleştirir.
 * @param rawDataList Backend'den gelen başvuru verileri listesi
 * @returns Frontend'de kullanılabilir Application listesi
 */
export const mapApplicationList = (rawDataList: any[]): Application[] => {
  return rawDataList.map(mapApplicationData);
};
