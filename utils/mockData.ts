export const specializations = [
  'Ceza Hukuku',
  'Medeni Hukuk',
  'İş Hukuku',
  'İdare Hukuku',
  'Ticaret Hukuku',
  'Aile Hukuku'
]

export const mockLawyers = [
  { id: 1, name: 'Av. Mehmet Yılmaz', specialization: 'Ceza Hukuku', activeCases: 5, email: 'mehmet@example.com', phone: '05551234567', barNumber: '12345' },
  { id: 2, name: 'Av. Ayşe Kaya', specialization: 'Medeni Hukuk', activeCases: 3, email: 'ayse@example.com', phone: '05559876543', barNumber: '23456' },
  { id: 3, name: 'Av. Ali Demir', specialization: 'İş Hukuku', activeCases: 7, email: 'ali@example.com', phone: '05553334444', barNumber: '34567' }
]

export const mockHakIhlalleri = [
  {
    id: 1,
    vakaBasligi: "Kadına Yönelik Şiddet Vakası",
    basvuranKisi: "Ayşe Yılmaz",
    kategori: "kadinaKarsiSiddet",
    kaynak: "bireyselBasvuru",
    durum: "İşlemde",
    basvuruTarihi: "2023-06-15",
    detaylar: "Ev içi şiddet vakası, acil koruma talebi mevcut.",
    olayOzeti: "Başvuran, eşi tarafından fiziksel ve psikolojik şiddete maruz kaldığını bildirmiştir.",
    basvuranAdi: "Ayşe Yılmaz",
    basvuranIletisim: "ayse@email.com | 0555-123-4567",
    basvuruMetni: "Eşim tarafından sürekli olarak şiddete maruz kalıyorum ve can güvenliğim tehlikede.",
    hukukiTemsilci: "Av. Mehmet Kaya",
    olayBildirenKurum: "Kadın Dayanışma Vakfı",
    kaynakDetay: "https://kadindayanismavakfi.org.tr",
    gelismeler: [
      { tarih: "2023-06-16", aciklama: "Koruma kararı alındı." },
      { tarih: "2023-06-20", aciklama: "Psikolojik destek süreci başlatıldı." }
    ],
    sonuc: "",
    dosyalar: [
      { ad: "Koruma Kararı", tur: "PDF", tarih: "2023-06-16" },
      { ad: "Sağlık Raporu", tur: "PDF", tarih: "2023-06-17" }
    ],
    mesajlar: [
      { gonderen: "Baro Yetkilisi", mesaj: "Koruma kararı alındı, güvende misiniz?", tarih: "2023-06-16T10:30:00Z" },
      { gonderen: "Ayşe Yılmaz", mesaj: "Evet, şu an güvendeyim. Teşekkür ederim.", tarih: "2023-06-16T11:15:00Z" }
    ]
  },
  {
    id: 2,
    vakaBasligi: "Çocuk İşçiliği İhbarı",
    basvuranKisi: "Mehmet Öz",
    kategori: "cocukHaklari",
    kaynak: "stk",
    durum: "Tamamlandı",
    basvuruTarihi: "2023-05-20",
    detaylar: "Tekstil atölyesinde çocuk işçi çalıştırıldığı ihbarı.",
    olayOzeti: "Bir tekstil atölyesinde 14 yaşından küçük çocukların çalıştırıldığı ihbar edildi.",
    basvuranAdi: "Mehmet Öz",
    basvuranIletisim: "mehmet@email.com | 0555-987-6543",
    basvuruMetni: "X Tekstil'de çocuk işçi çalıştırıldığını gözlemledim ve bu durumu bildirmek istiyorum.",
    hukukiTemsilci: "Av. Zeynep Aksoy",
    olayBildirenKurum: "Çocuk Hakları Derneği",
    kaynakDetay: "https://cocukhaklaridernegi.org",
    gelismeler: [
      { tarih: "2023-05-22", aciklama: "İlgili kurumlara bildirim yapıldı." },
      { tarih: "2023-06-05", aciklama: "Denetim gerçekleştirildi, işletmeye ceza kesildi." }
    ],
    sonuc: "İşletme denetlendi, çocuk işçiler tespit edildi ve gerekli yasal işlemler başlatıldı.",
    dosyalar: [
      { ad: "Denetim Raporu", tur: "PDF", tarih: "2023-06-05" },
      { ad: "Ceza Tutanağı", tur: "PDF", tarih: "2023-06-07" }
    ],
    mesajlar: [
      { gonderen: "Baro Yetkilisi", mesaj: "İhbarınız için teşekkürler, denetim süreci başlatıldı.", tarih: "2023-05-23T09:00:00Z" },
      { gonderen: "Mehmet Öz", mesaj: "Bilgilendirme için teşekkürler.", tarih: "2023-05-23T10:30:00Z" }
    ]
  },
  {
    id: 3,
    vakaBasligi: "İfade Özgürlüğü İhlali",
    basvuranKisi: "Ali Veli",
    kategori: "ifadeOzgurlugu",
    kaynak: "medya",
    durum: "İşlemde",
    basvuruTarihi: "2023-06-01",
    detaylar: "Gazetecinin haber yapma özgürlüğünün engellenmesi.",
    olayOzeti: "Yerel bir gazeteci, çevre kirliliği hakkında haber yaparken yetkililerce engellendiğini ve tehdit edildiğini bildirdi.",
    basvuranAdi: "Ali Veli",
    basvuranIletisim: "ali@email.com | 0555-111-2222",
    basvuruMetni: "Çevre kirliliği hakkında haber yaparken yetkililer tarafından engellendim ve tehdit edildim.",
    hukukiTemsilci: "Av. Ayşe Yıldız",
    olayBildirenKurum: "Gazeteciler Cemiyeti",
    kaynakDetay: "https://gazetecilercemiyeti.org",
    gelismeler: [
      { tarih: "2023-06-03", aciklama: "Savcılığa suç duyurusunda bulunuldu." },
      { tarih: "2023-06-10", aciklama: "İfade özgürlüğü ihlali raporu hazırlandı." }
    ],
    sonuc: "",
    dosyalar: [
      { ad: "Suç Duyurusu", tur: "PDF", tarih: "2023-06-03" },
      { ad: "İhlal Raporu", tur: "PDF", tarih: "2023-06-10" }
    ],
    mesajlar: [
      { gonderen: "Baro Yetkilisi", mesaj: "Başvurunuz alındı, hukuki süreç başlatılıyor.", tarih: "2023-06-02T11:00:00Z" },
      { gonderen: "Ali Veli", mesaj: "Teşekkür ederim, gelişmeleri bekliyorum.", tarih: "2023-06-02T12:30:00Z" }
    ]
  }
]

export const mockDavalar = [
  {
    id: 1,
    davaNumarasi: 'DVA2023001',
    davaAdi: 'Örnek Ceza Davası',
    davaOzeti: 'Bu bir örnek ceza davası özetidir.',
    basvuran: {
      adiSoyadi: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      telefon: '05551234567'
    },
    karsiTaraf: {
      adiSoyadi: 'XYZ Şirketi',
      avukat: 'Av. Mehmet Kaya'
    },
    avukat: 'Av. Mehmet Öz',
    durum: 'aktif',
    baslangicTarihi: '2023-01-15',
    kategori: 'ceza',
    durusmalar: [
      { tarih: '2023-02-15', saat: '10:00', aciklama: 'İlk duruşma' },
      { tarih: '2023-03-20', saat: '11:30', aciklama: 'İkinci duruşma' }
    ],
    belgeler: [
      { ad: 'Dava Dilekçesi', tur: 'PDF', tarih: '2023-01-15T10:30:00Z' },
      { ad: 'Tanık İfadesi', tur: 'DOC', tarih: '2023-02-20T14:45:00Z' }
    ],
    hakIhlali: {
      kategori: 'Kişi Özgürlüğü ve Güvenliği',
      aciklama: 'Haksız tutuklama iddiası'
    },
    mesajlar: [
      { gonderen: 'Av. Mehmet Öz', mesaj: 'Dava dosyası incelendi, ek belge gerekiyor.', tarih: '2023-01-20T09:15:00Z' },
      { gonderen: 'Baro Yetkilisi', mesaj: 'Ek belgeler talep edildi.', tarih: '2023-01-21T11:30:00Z' }
    ],
    gecmis: [
      { tarih: '2023-01-15', islem: 'Dava Açıldı', aciklama: 'Dava dilekçesi mahkemeye sunuldu.' },
      { tarih: '2023-02-15', islem: 'İlk Duruşma', aciklama: 'Taraflar dinlendi, tanık çağrılmasına karar verildi.' },
      { tarih: '2023-03-20', islem: 'İkinci Duruşma', aciklama: 'Tanıklar dinlendi, bilirkişi atanmasına karar verildi.' }
    ],
    sonuc: '',
    kapanisTarihi: '',
    kapanisAciklamasi: ''
  },
]

export const mockApplications = [
  {
    id: "1",
    applicantName: "Ahmet Yılmaz",
    eventTitle: "İş Yerinde Ayrımcılık",
    eventCategory: "isHukuku",
    status: "islemde",
    date: "2023-06-01",
    assignedLawyer: "Av. Mehmet Öz"
  },
  {
    id: "2",
    applicantName: "Ayşe Kaya",
    eventTitle: "Eğitim Hakkı İhlali",
    eventCategory: "egitimHakki",
    status: "tamamlandi",
    date: "2023-05-15",
    assignedLawyer: "Av. Zeynep Demir"
  },
  {
    id: "3",
    applicantName: "Mustafa Çelik",
    eventTitle: "İfade Özgürlüğü İhlali",
    eventCategory: "ifadeOzgurlugu",
    status: "beklemede",
    date: "2023-06-10",
    assignedLawyer: null
  }
]

export const mockRaporlar = [
  {
    id: 1,
    baslik: "2024 Yılı Dava İstatistik Raporu",
    tur: "dava",
    zamanAraligi: "Yıllık",
    durum: "Yayımlandı",
    tarih: "2024-01-15"
  },
  {
    id: 2,
    baslik: "2023 Q4 Hak İhlalleri Özet Raporu",
    tur: "hakIhlali",
    zamanAraligi: "Çeyreklik",
    durum: "İnceleniyor",
    tarih: "2024-01-10"
  },
  {
    id: 3,
    baslik: "Aralık 2023 Avukat Performans Raporu",
    tur: "avukatPerformans",
    zamanAraligi: "Aylık",
    durum: "Hazırlanıyor",
    tarih: "2024-01-05"
  },
  {
    id: 4,
    baslik: "2023 Yılı Genel Değerlendirme Raporu",
    tur: "genel",
    zamanAraligi: "Yıllık",
    durum: "Yayımlandı",
    tarih: "2024-01-20"
  },
  {
    id: 5,
    baslik: "Ocak 2024 Dava Akış Raporu",
    tur: "dava",
    zamanAraligi: "Aylık",
    durum: "Hazırlanıyor",
    tarih: "2024-02-01"
  }
]

