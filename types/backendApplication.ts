export interface BackendApplication {
    _id: string;
    name: string;
    surname: string;
    title: string;
    category?: { name: string };
    status: "pending" | "in_progress" | "closed";
    complaintDate: string; // Tarih string formatında geliyor
    assignedLawyer?: string; // Atanmış avukatın adı (opsiyonel)
    createdAt: string;
  }
  