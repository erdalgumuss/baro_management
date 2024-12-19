import "@/styles/globals.css"; // Global CSS
import HeroSection from '@/components/pages/index/HeroSection'
import CitizenActionButtons from '@/components/pages/index/CitizenActionButtons'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4">
          <CitizenActionButtons />
          <section id="hakkimizda" className="my-12 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hakkımızda</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Baro Yönetim Sistemi, Türkiyedeki hukuk sistemini modernize etmek ve vatandaşların adalete erişimini kolaylaştırmak amacıyla geliştirilmiş yenilikçi bir platformdur. Sistemimiz, vatandaşlar, avukatlar ve baro yetkilileri arasında köprü görevi görerek, hukuki süreçleri daha şeffaf, erişilebilir ve verimli hale getirmeyi hedeflemektedir.
              </p>
              <p>
                Platformumuz, en son teknolojik gelişmeleri kullanarak, hukuki başvuruların online olarak yapılmasını, davaların takibini ve avukat atama süreçlerinin otomatikleştirilmesini sağlar. Bu sayede, vatandaşlarımız ihtiyaç duydukları hukuki desteğe daha hızlı ve kolay bir şekilde ulaşabilirken, avukatlarımız da iş yüklerini daha etkin bir şekilde yönetebilmektedir.
              </p>
              <p>
                Baro Yönetim Sistemi, aynı zamanda hak ihlalleri konusunda farkındalığı artırmayı ve bu ihlallere karşı hızlı ve etkili bir şekilde harekete geçmeyi amaçlamaktadır. Sistemimiz, özellikle kadın cinayetleri, çocuk istismarı ve aile içi şiddet gibi kritik konularda, mağdurların sesini duyurabilmelerine ve gerekli hukuki desteği alabilmelerine olanak tanır.
              </p>
              <p>
                Vizyonumuz, Türkiyede hukukun üstünlüğünü güçlendirmek, adalete erişimi demokratikleştirmek ve toplumun her kesiminin haklarını korumaktır. Baro Yönetim Sistemi olarak, teknolojinin gücünü kullanarak, daha adil ve eşitlikçi bir toplum inşa etme yolunda önemli bir adım attığımıza inanıyoruz.
              </p>
            </div>
          </section>
          <section id="iletisim" className="my-12 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">İletişim</h2>
            <p className="text-gray-600">
              Adres: Örnek Mahallesi, Adalet Caddesi No: 123<br />
              Telefon: (555) 123-4567<br />
              E-posta: info@baroyonetimsistemi.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

