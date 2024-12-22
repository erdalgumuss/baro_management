1. AppWrapper ile Global Auth Durumu Yönetimi
Amaç: Uygulama genelinde oturum bilgisini (isAuthenticated, role, tokens) yönetmek ve token çözümleme işlemlerini gerçekleştirmek.
İşlevler:
localStorage'da bulunan accessToken ve refreshToken bilgilerini kontrol ettik.
Eğer token bilgileri mevcutsa, jwt_decode kullanarak accessToken'dan kullanıcı role bilgisini çözdük.
Çözümlenen role bilgisini ve diğer oturum bilgilerini useAuthStore'a kaydettik.
Kritik Noktalar:

useAuthStore kullanarak oturum durumunu (isAuthenticated) ve role bilgisini global olarak saklıyoruz.
Token eksikse veya geçersizse oturum bilgileri sıfırlanıyor.
2. useAuthStore ile Global State Yönetimi
Amaç: Kullanıcının oturum durumu, role bilgisi ve token bilgilerini yönetmek.
İşlevler:
setAuth: Kullanıcı oturum bilgisini (isAuthenticated, role, tokens) günceller ve token bilgilerini localStorage'da saklar.
clearAuth: Oturum bilgisini sıfırlar ve token bilgilerini temizler.
refreshAccessToken: refreshToken kullanarak yeni bir accessToken alır ve günceller.
Kritik Noktalar:

role bilgisinin doğru saklandığını ve diğer bileşenlerden erişilebilir olduğunu doğruladık.
3. LoginModal ile Kullanıcı Girişi ve Yönlendirme
Amaç: Kullanıcının giriş yapmasını sağlamak ve role bilgisine göre ilgili sayfaya yönlendirmek.
İşlevler:
Giriş işlemi sırasında backend'den gelen accessToken ve refreshToken bilgilerini aldık.
Token bilgilerini localStorage'a kaydettik ve useAuthStore ile oturum bilgilerini güncelledik.
Kullanıcı role bilgisine göre /lawyer veya /bar sayfalarına yönlendirme yaptık.
Eğer kullanıcı isActive değilse, kayıt tamamlama modalını açtık.
Kritik Noktalar:

role bilgisini global store'dan (useAuthStore) alarak role bazlı yönlendirme işlemlerini gerçekleştirdik.

Genel İş Akışı
Uygulama Başlatılırken:

AppWrapper üzerinden localStorage'daki token bilgileri kontrol edildi.
Eğer geçerli token bilgileri varsa, accessToken çözümlenerek role bilgisi alındı ve useAuthStore güncellendi.
Kullanıcı Girişi:

Kullanıcı giriş yaptığında backend'den gelen token bilgileri saklandı.
role bilgisine göre ilgili sayfaya yönlendirme yapıldı.
Oturum Yönetimi:

useAuthStore üzerinden oturum durumu (isAuthenticated), role bilgisi ve token bilgileri yönetildi.
Role Bazlı Yönlendirme:

Kullanıcı role bilgisine göre /lawyer veya /bar sayfalarına yönlendirilme 
henüz çalışmıyor. bar/layout.tsx güncellenmeli.
loginde isActivekontrolü????