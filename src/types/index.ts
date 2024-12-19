// Dava (Case) related interfaces
export interface Dava {
    id: string;
    ad: string;
    numara: string;
    durum: 'aktif' | 'tamamlanmis' | 'beklemede';
    basvuran: string;
    avukat: string;
    konu: string;
    basariOrani: number;
    kategori: string;
    basvuranIletisim: string;
    ozet: string;
    dosyalar: string[];
    sonrakiDurusma?: string;
    surec?: DavaSureci[];
    belgeler?: Belge[];
    durusmalar?: Durusma[];
    mesajlar?: Mesaj[];
  }
  
  export interface DavaSureci {
    tarih: string;
    aciklama: string;
  }
  
  export interface Belge {
    id: string;
    ad: string;
    tur: string;
    yuklemeTarihi: string;
    yukleyenKisi: string;
    durum: 'incelenmedi' | 'onaylandi' | 'reddedildi';
  }
  
  export interface Durusma {
    id: string;
    tarih: Date;
    saat: string;
    aciklama: string;
  }
  
  export interface Mesaj {
    id: string;
    gonderen: string;
    icerik: string;
    tarih: string;
  }
  
  // Avukat (Lawyer) related interfaces
  export interface Avukat {
    id: string;
    name: string;
    email: string;
    phone: string;
    barNumber: string;
    specialization: string;
    activeCases: number;
    lawyerReferenceNumber: string;
    cases?: Dava[];
    education?: AvukatEgitim[];
  }
  
  export interface AvukatEgitim {
    name: string;
    institution: string;
    date: string;
  }
  
  // Basvuru (Application) related interfaces
  export interface Basvuru {
    id: string;
    applicationNumber: string;
    applicantName: string;
    caseSubject: string;
    status: 'active' | 'completed' | 'pending' | 'cancelled';
    applicationDate: string;
    assignedLawyer?: string;
    summary?: string;
    notes?: BasvuruNot[];
  }
  
  export interface BasvuruNot {
    text: string;
    date: string;
  }
  
  // HakIhlali (Rights Violation) related interfaces
  export interface HakIhlali {
    id: string;
    vakaBasligi: string;
    basvuranKisi: string;
    kategori: string;
    kaynak: string;
    durum: string;
    basvuruTarihi: string;
    detaylar: string;
    olayOzeti: string;
    basvuranAdi: string;
    basvuranIletisim: string;
    basvuruMetni: string;
    hukukiTemsilci: string;
    olayBildirenKurum: string;
    kaynakDetay: string;
    gelismeler: HakIhlaliGelisme[];
    sonuc: string;
    dosyalar: HakIhlaliDosya[];
    mesajlar: HakIhlaliMesaj[];
  }
  
  export interface HakIhlaliGelisme {
    tarih: string;
    aciklama: string;
  }
  
  export interface HakIhlaliDosya {
    ad: string;
    tur: string;
    tarih: string;
  }
  
  export interface HakIhlaliMesaj {
    gonderen: string;
    mesaj: string;
    tarih: string;
  }
  
  // Rapor (Report) related interfaces
  export interface Rapor {
    id: number;
    baslik: string;
    tur: string;
    zamanAraligi: string;
    durum: string;
    tarih: string;
    icerik?: string;
  }
  
  // Component Props interfaces
  export interface DavaKartiProps {
    dava: Dava;
    onDetayGor: (id: string) => void;
  }
  
  export interface DavaAramaFiltreProps {
    onFilter: (filteredDavalar: Dava[]) => void;
    davalar: Dava[];
  }
  
  export interface DavaListesiProps {
    davalar: Dava[];
    onDetayGor: (id: string) => void;
  }
  
  export interface DavaDetayProps {
    dava: Dava;
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface AvukatFormProps {
    avukat?: Avukat;
    onClose: () => void;
    onSubmit: (avukat: Avukat) => void;
  }
  
  export interface BasvuruFormProps {
    basvuru?: Basvuru;
    onClose: () => void;
    onSubmit: (basvuru: Basvuru) => void;
  }
  
  export interface HakIhlaliFormProps {
    hakIhlali?: HakIhlali;
    onClose: () => void;
    onSubmit: (hakIhlali: HakIhlali) => void;
  }
  
  export interface RaporOlusturProps {
    onClose: () => void;
    onSubmit: (rapor: Rapor) => void;
  }
  
  // Dashboard related interfaces
  export interface DashboardCardProps {
    title: string;
    description: string;
    value: number | string;
    icon: React.ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    variant?: 'default' | 'primary';
  }
  
  // Calendar related interfaces
  export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: unknown;
  }
  
  // User related interfaces
  export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'lawyer' | 'user';
  }
  
  // Authentication related interfaces
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
  }
  
  // API response interfaces
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Pagination interface
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  
  // Search and filter interfaces
  export interface SearchParams {
    query: string;
    filters: Record<string, string | number | boolean>;
    page: number;
    pageSize: number;
  }
  
  // Notification interface
  export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    createdAt: string;
    read: boolean;
  }
  
  