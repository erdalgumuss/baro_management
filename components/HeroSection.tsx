import { ArrowRight, Scale, Users, FileText } from 'lucide-react'
import LoginModal from './LoginModal'

export default function HeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <div className="absolute top-4 right-4">
        <LoginModal />
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Baro Yönetim Sistemi
          </h1>
          <p className="text-xl mb-8">
            Adalet için teknoloji. Vatandaşlar, avukatlar ve baro yetkilileri için modern ve kullanıcı dostu bir platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Scale className="w-10 h-10 mb-4" />}
              title="Adil Erişim"
              description="Herkes için eşit ve kolay hukuki destek erişimi sağlıyoruz."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 mb-4" />}
              title="İşbirliği"
              description="Vatandaşlar, avukatlar ve baro arasında etkin iletişim."
            />
            <FeatureCard
              icon={<FileText className="w-10 h-10 mb-4" />}
              title="Dijital Çözümler"
              description="Hukuki süreçleri dijitalleştirerek verimliliği artırıyoruz."
            />
          </div>
          <a href="#hakkimizda" className="inline-flex items-center mt-8 text-lg font-semibold hover:underline">
            Daha fazla bilgi
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-center">{description}</p>
      </div>
    </div>
  )
}

