AUTH İŞLEMLERİNDE İŞLEV;
1. useAuthStore
Kontrol:
Token Yönetimi: accessToken ve refreshToken eklenmiş durumda.
Kullanıcı Bilgileri: Kullanıcı bilgileri (userInfo) güncel ve id, tcNumber, role gibi tüm gerekli alanları içeriyor.
Oturum Yönetimi: clearAuth metodu ile oturum temizleme işlemleri destekleniyor.

2. useAuth Hook 
Kontrol:
Kullanıcı Bilgilerini Alma: accessToken ile kullanıcı bilgileri alınıyor.
Token Yenileme: refreshToken kullanılarak token yenileme işlemi sağlanıyor.
Hata Yönetimi: Token yenileme başarısız olursa oturum temizleniyor.

3.  useRole Hook 
Kontrol:
Rol Tespiti: Kullanıcının rolü belirleniyor.
Yetki Kontrolü: canManageMembers ve canViewLawyerPanel gibi yetkilendirme kontrolleri mevcut.
Genişletilebilirlik: Yeni roller veya yetkiler kolayca eklenebilir.

4. Kullanıcı Atama (AddMemberModal)
Kontrol:
Form İşlemleri: Gerekli tüm alanlar (TC kimlik numarası, ad, soyad, rol) kontrol ediliyor.
Backend Entegrasyonu: registerUser servisi ile başarılı bir şekilde veri gönderiliyor.
Geri Dönüş İşleme: Backend'den gelen referenceNumber ve diğer kullanıcı bilgileri kaydediliyor.
Hata Yönetimi: Hatalar kullanıcıya bildirilip kontrol altına alınıyor.

5. Servis Katmanı
Kontrol:
Kullanıcı Atama (registerUser): Backend'e başarılı bir şekilde entegre edilmiş.
Kullanıcı Bilgisi Alma (fetchUserInfo): Kullanıcı bilgileri doğru şekilde getiriliyor.
Token Yenileme (refreshToken): refreshToken ile yeni bir accessToken alınabiliyor.
